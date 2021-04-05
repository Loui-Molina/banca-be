import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lottery } from '@database/datamodels/schemas/lottery';
import { User } from '@database/datamodels/schemas/user';
import { ConsortiumLottery } from '@database/datamodels/schemas/consortium.lottery';
import { Consortium } from '@database/datamodels/schemas/consortium';
import { Banking } from '@database/datamodels/schemas/banking';
import { BankingLotteryDto } from '@lotteries/banking/dtos/banking.lottery.dto';
import { Days } from '@database/datamodels/enums/days';
import { ConstApp } from '@utils/const.app';
import { DateHelper, DAY_LENGTH } from '@utils/date.helper';

@Injectable()
export class BankingLotteryService {
    constructor(
        @InjectModel(Lottery.name) private readonly lotteryModel: Model<Lottery>,
        @InjectModel(Banking.name) private readonly bankingModel: Model<Banking>,
        @InjectModel(Consortium.name) private readonly consortiumModel: Model<Consortium>,
    ) {
    }

    async getAll(loggedUser: User): Promise<Array<BankingLotteryDto>> {
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
                    const lotteryOpenTime: Date = new Date(lottery.openTime),
                        lotteryCloseTime: Date = new Date(lottery.closeTime),
                        now: Date = new Date();

                    let leftTime = DateHelper.getHourlyDiff(lotteryCloseTime, now);
                    if (
                        !(
                            DateHelper.getHourlyDiff(now, lotteryOpenTime) >= 0 &&
                            DateHelper.getHourlyDiff(lotteryCloseTime, now) >= 0
                        )
                    ) {
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
                        lottery.blockedNumbers = consortiumLottery.blockedNumbers;
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
}
