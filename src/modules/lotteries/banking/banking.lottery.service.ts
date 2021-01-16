import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LotteryTime, LotteryTimeDocument } from '@database/datamodels/schemas/lottery.time';
import { Lottery, LotteryDocument } from '@database/datamodels/schemas/lottery';
import { Result, ResultDocument } from '@database/datamodels/schemas/result';
import { Draw, DrawDocument } from '@database/datamodels/schemas/draw';
import { UserDocument } from '@database/datamodels/schemas/user';
import { ConsortiumLottery, ConsortiumLotteryDocument } from '@database/datamodels/schemas/consortium.lottery';
import { Consortium, ConsortiumDocument } from '@database/datamodels/schemas/consortium';
import { Banking, BankingDocument } from '@database/datamodels/schemas/banking';
import { BankingLotteryDto } from '@src/modules/lotteries/banking/dtos/banking.lottery.dto';
import { Days } from '@database/datamodels/enums/days';

@Injectable()
export class BankingLotteryService {
    constructor(
        @InjectModel(Lottery.name) private lotteryModel: Model<LotteryDocument>,
        @InjectModel(LotteryTime.name) private lotteryTimeModel: Model<LotteryTimeDocument>,
        @InjectModel(ConsortiumLottery.name) private consortiumLotteryModel: Model<ConsortiumLotteryDocument>,
        @InjectModel(Banking.name) private bankingModel: Model<BankingDocument>,
        @InjectModel(Consortium.name) private consortiumModel: Model<ConsortiumDocument>,
        @InjectModel(Result.name) private resultModel: Model<ResultDocument>,
        @InjectModel(Draw.name) private drawModel: Model<DrawDocument>,
    ) {}

    async getAll(loggedUser: UserDocument): Promise<Array<BankingLotteryDto>> {
        const banking = (await this.bankingModel.find({ ownerUserId: loggedUser._id })).pop();
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
        const lotteriesDtos: BankingLotteryDto[] = [];
        lotteries.map((lottery: BankingLotteryDto) => {
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
