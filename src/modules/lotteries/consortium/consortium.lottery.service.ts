import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Consortium } from 'src/modules/database/datamodels/schemas/consortium';
import { ConsortiumLottery } from 'src/modules/database/datamodels/schemas/consortium.lottery';
import { Lottery } from 'src/modules/database/datamodels/schemas/lottery';
import { User } from 'src/modules/database/datamodels/schemas/user';
import { Model } from 'mongoose';
import { ConsortiumLotteryDto } from './dtos/consortium.lottery.dto';
import { ConsortiumUpdateLotteryDto } from './dtos/consortium.update.lottery.dto';

@Injectable()
export class ConsortiumLotteryService {
    constructor(
        @InjectModel(Lottery.name) private readonly lotteryModel: Model<Lottery>,
        @InjectModel(ConsortiumLottery.name) private readonly consortiumLotteryModel: Model<ConsortiumLottery>,
        @InjectModel(Consortium.name) private readonly consortiumModel: Model<Consortium>,
    ) {}

    async getAll(loggedUser: User): Promise<Array<ConsortiumLotteryDto>> {
        const consortium = (await this.consortiumModel.find({ ownerUserId: loggedUser._id })).pop();
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
        lotteries.map((lottery: ConsortiumLotteryDto) => {
            const consortiumLotterys = consortium.consortiumLotteries.filter(
                (item) => item.lotteryId.toString() === lottery._id.toString(),
            );
            if (consortiumLotterys.length > 0) {
                const consortiumLottery: ConsortiumLottery = consortiumLotterys.pop();
                lottery.bankings = consortiumLottery.bankingIds;
                lottery.prizeLimits = consortiumLottery.prizeLimits;
                lottery.bettingLimits = consortiumLottery.bettingLimits;
            }
        });
        return lotteries;
    }

    async update(dto: ConsortiumUpdateLotteryDto, loggedUser: User): Promise<Lottery> {
        const lottery: Lottery = await this.get(dto._id);
        const consortium = (await this.consortiumModel.find({ ownerUserId: loggedUser._id })).pop();
        if (!consortium) {
            throw new BadRequestException();
        }

        //Creating Prize Limits
        dto.prizeLimits.map((item) => {
            item.creationUserId = loggedUser._id;
            item.modificationUserId = loggedUser._id;
        });
        //Creating Betting Limits
        dto.bettingLimits.map((item) => {
            item.creationUserId = loggedUser._id;
            item.modificationUserId = loggedUser._id;
        });

        const consortiumLottery: ConsortiumLottery = new this.consortiumLotteryModel({
            lotteryId: lottery._id,
            bankingIds: dto.bankings,
            creationUserId: loggedUser._id,
            modificationUserId: loggedUser._id,
            prizeLimits: dto.prizeLimits,
            bettingLimits: dto.bettingLimits,
        });
        const index = consortium.consortiumLotteries.findIndex(
            (item) => item.lotteryId.toString() === lottery._id.toString(),
        );
        if (index !== -1) {
            consortium.consortiumLotteries.splice(index, 1);
        }
        consortium.consortiumLotteries.push(consortiumLottery);
        await consortium.save();
        return lottery;
    }

    async get(id: any) {
        return this.lotteryModel.findById(id).exec();
    }
}
