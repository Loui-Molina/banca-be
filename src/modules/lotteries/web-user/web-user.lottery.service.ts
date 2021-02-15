import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Days } from 'src/modules/database/datamodels/enums/days';
import { Banking } from 'src/modules/database/datamodels/schemas/banking';
import { Consortium } from 'src/modules/database/datamodels/schemas/consortium';
import { ConsortiumLottery } from 'src/modules/database/datamodels/schemas/consortium.lottery';
import { Lottery } from 'src/modules/database/datamodels/schemas/lottery';
import { User } from 'src/modules/database/datamodels/schemas/user';
import { WebUser } from 'src/modules/database/datamodels/schemas/web.user';
import { Model } from 'mongoose';
import { WebUserLotteryDto } from './dtos/web-user.lottery.dto';


@Injectable()
export class WebUserLotteryService {
    constructor(
        @InjectModel(Lottery.name) private readonly lotteryModel: Model<Lottery>,
        @InjectModel(Banking.name) private readonly bankingModel: Model<Banking>,
        @InjectModel(Consortium.name) private readonly consortiumModel: Model<Consortium>,
        @InjectModel(WebUser.name) private readonly webUserModel: Model<WebUser>,
    ) {}

    async getAll(loggedUser: User): Promise<Array<WebUserLotteryDto>> {
        const webuser = await this.webUserModel.findOne({ ownerUserId: loggedUser._id });
        const banking = await this.bankingModel.findOne({ _id: webuser.bankingId });
        const consortium = await this.consortiumModel.findById(banking.consortiumId);
        const lotteries = await this.lotteryModel.aggregate([
            { $match: {} },
            {
                $project: {
                    _id: '$_id',
                    name: '$name',
                    nickname: '$nickname',
                    playTime: '$playTime',
                    color: '$color',
                    results: '$results',
                    creationUserId: '$creationUserId',
                    modificationUserId: '$modificationUserId',
                    status: '$status',
                    openTime: '$time.openTime',
                    closeTime: '$time.closeTime',
                    day: '$time.day',
                },
            },
        ]);
        const lotteriesDtos: WebUserLotteryDto[] = [];
        lotteries.map((lottery: WebUserLotteryDto) => {
            const consortiumLotterys = consortium.consortiumLotteries.filter(
                (item) => item.lotteryId.toString() === lottery._id.toString(),
            );
            if (consortiumLotterys.length > 0) {
                const consortiumLottery: ConsortiumLottery = consortiumLotterys.pop();
                let flag = false;
                consortiumLottery.bankingIds.map((bankingId) => {
                    if (bankingId.toString() === banking._id.toString()) {
                        flag = true;
                    }
                });
                if (flag) {
                    const lotteryOpenTime = lottery.openTime.split(':');
                    const lotteryCloseTime = lottery.closeTime.split(':');
                    const lotteryPlayTime = lottery.playTime.split(':');
                    const date = new Date();
                    const lotteryOpenTimeDate = new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        parseInt(lotteryOpenTime[0]),
                        parseInt(lotteryOpenTime[1]),
                        0,
                    );
                    const lotteryCloseTimeDate = new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        parseInt(lotteryCloseTime[0]),
                        parseInt(lotteryCloseTime[1]),
                        0,
                    );
                    const now = new Date();
                    let leftTime = (lotteryCloseTimeDate.getTime() - now.getTime()) / 1000;
                    if (!(lotteryOpenTimeDate <= now && lotteryCloseTimeDate >= now)) {
                        lottery.status = false;
                        leftTime = 0;
                    }
                    const days = lottery.day;
                    let opened = false;
                    const nowDay = new Date().getDay();
                    switch (nowDay) {
                        case 0:
                            if (days.includes(Days.sun)) {
                                opened = true;
                            }
                            break;
                        case 1:
                            if (days.includes(Days.mon)) {
                                opened = true;
                            }
                            break;
                        case 2:
                            if (days.includes(Days.tue)) {
                                opened = true;
                            }
                            break;
                        case 3:
                            if (days.includes(Days.wed)) {
                                opened = true;
                            }
                            break;
                        case 4:
                            if (days.includes(Days.thu)) {
                                opened = true;
                            }
                            break;
                        case 5:
                            if (days.includes(Days.fri)) {
                                opened = true;
                            }
                            break;
                        case 6:
                            if (days.includes(Days.sat)) {
                                opened = true;
                            }
                            break;
                    }
                    if (opened) {
                        lottery.bankings = consortiumLottery.bankingIds;
                        lottery.prizeLimits = consortiumLottery.prizeLimits;
                        lottery.bettingLimits = consortiumLottery.bettingLimits;
                        lottery.leftTime = leftTime;
                        lotteriesDtos.push(lottery);
                    }
                }
            }
        });
        return lotteriesDtos;
    }
}
