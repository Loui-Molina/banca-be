import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lottery } from '@database/datamodels/schemas/lottery';
import { User } from '@database/datamodels/schemas/user';
import { ConsortiumLottery } from '@database/datamodels/schemas/consortium.lottery';
import { Consortium } from '@database/datamodels/schemas/consortium';
import { Banking } from '@database/datamodels/schemas/banking';
import { Days } from '@database/datamodels/enums/days';
import { WebUserLotteryDto } from '@lotteries/web-user/dtos/web-user.lottery.dto';
import { WebUser } from '@database/datamodels/schemas/web.user';
import { ConstApp } from '@utils/const.app';
import * as mongoose from 'mongoose';
import { ObjectId, Model } from 'mongoose';

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
                    const lotteryOpenTime: Date = new Date(lottery.openTime);
                    const lotteryCloseTime: Date = new Date(lottery.closeTime);

                    const now = new Date('1970-01-01T' + new Date().toISOString().split('T')[1]);
                    let leftTime = (lotteryCloseTime.getTime() - now.getTime()) / 1000;
                    if (!(lotteryOpenTime <= now && lotteryCloseTime >= now)) {
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
        lotteriesDtos.sort((a, b) => (a.leftTime > b.leftTime ? 1 : b.leftTime > a.leftTime ? -1 : 0));
        lotteriesDtos.sort((a, b) => (!a.leftTime ? 1 : !b.leftTime ? -1 : 0));
        return lotteriesDtos;
    }

    async get(lotteryId: string, loggedUser: User): Promise<WebUserLotteryDto> {
        const webuser = await this.webUserModel.findOne({ ownerUserId: loggedUser._id });
        const banking = await this.bankingModel.findOne({ _id: webuser.bankingId });
        const consortium = await this.consortiumModel.findById(banking.consortiumId);
        const lotteries = await this.lotteryModel.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(lotteryId) } },
            {
                $project: {
                    _id: '$_id',
                    name: '$name',
                    nickname: '$nickname',
                    playTime: '$playTime',
                    color: '$color',
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
                    const lotteryOpenTime: Date = new Date(lottery.openTime);
                    const lotteryCloseTime: Date = new Date(lottery.closeTime);

                    const now = new Date('1970-01-01T' + new Date().toISOString().split('T')[1]);
                    let leftTime = (lotteryCloseTime.getTime() - now.getTime()) / 1000;
                    if (!(lotteryOpenTime <= now && lotteryCloseTime >= now)) {
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
        if (lotteriesDtos.length > 0) {
            return lotteriesDtos.pop();
        }
        throw new BadRequestException(ConstApp.UNAUTHORIZED);
    }
}
