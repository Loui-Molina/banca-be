import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {LotteryTime, LotteryTimeDocument} from "@database/datamodels/schemas/lottery.time";
import {Lottery, LotteryDocument} from "@database/datamodels/schemas/lottery";
import {Result, ResultDocument } from '@database/datamodels/schemas/result';
import {Draw, DrawDocument} from '@database/datamodels/schemas/draw';
import {UserDocument} from "@database/datamodels/schemas/user";
import {ConsortiumLotteryDto} from "@src/modules/lotteries/consortium/dtos/consortium.lottery.dto";
import {ConsortiumUpdateLotteryDto} from "@src/modules/lotteries/consortium/dtos/consortium.update.lottery.dto";
import {ConsortiumLottery, ConsortiumLotteryDocument} from "@database/datamodels/schemas/consortium.lottery";
import {Consortium, ConsortiumDocument} from "@database/datamodels/schemas/consortium";
import {PrizeLimit} from "@database/datamodels/schemas/prize.limit";

@Injectable()
export class ConsortiumLotteryService {
    constructor(
        @InjectModel(Lottery.name) private lotteryModel: Model<LotteryDocument>,
        @InjectModel(LotteryTime.name) private lotteryTimeModel: Model<LotteryTimeDocument>,
        @InjectModel(ConsortiumLottery.name) private consortiumLotteryModel: Model<ConsortiumLotteryDocument>,
        @InjectModel(Consortium.name) private consortiumModel: Model<ConsortiumDocument>,
        @InjectModel(Result.name) private resultModel: Model<ResultDocument>,
        @InjectModel(Draw.name) private drawModel: Model<DrawDocument>,
    ) {    }

    async getAll(loggedUser: UserDocument): Promise<Array<ConsortiumLotteryDto>> {
        const consortium = (await this.consortiumModel.find({ownerUserId: loggedUser._id})).pop();
        const lotteries = await this.lotteryModel.aggregate([
            {$match: {}},
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
                    day: '$time.day'
                }
            }]);
        lotteries.map((lottery: ConsortiumLotteryDto) => {
            const consortiumLotterys = consortium.consortiumLotteries.filter(item => item.lotteryId.toString() === lottery._id.toString());
            if (consortiumLotterys.length > 0) {
                const consortiumLottery: ConsortiumLottery = consortiumLotterys.pop();
                lottery.bankings = consortiumLottery.bankingIds;
                lottery.prizeLimits = consortiumLottery.prizeLimits;
                lottery.bettingLimits = consortiumLottery.bettingLimits;
            }
        });
        return lotteries;
    }

    async update(dto: ConsortiumUpdateLotteryDto, loggedUser: UserDocument): Promise<Lottery> {
        const lottery = await this.get(dto._id);
        const consortium = (await this.consortiumModel.find({ownerUserId: loggedUser._id})).pop();
        if(!consortium){
            throw new BadRequestException();
        }

        //Creating Prize Limits
        dto.prizeLimits.map((item) => {
            item.creationUserId =  loggedUser._id;
            item.modificationUserId = loggedUser._id;
        });
        //Creating Betting Limits
        dto.bettingLimits.map((item) => {
            item.creationUserId =  loggedUser._id;
            item.modificationUserId = loggedUser._id;
        });

        const consortiumLottery = new this.consortiumLotteryModel({
            lotteryId: lottery._id,
            bankingIds: dto.bankings,
            creationUserId: loggedUser._id,
            modificationUserId: loggedUser._id,
            prizeLimits: dto.prizeLimits,
            bettingLimits: dto.bettingLimits
        });
        const index = consortium.consortiumLotteries.findIndex(item => item.lotteryId.toString() === lottery._id.toString());
        if(index !== -1){
            consortium.consortiumLotteries.splice(index, 1);
        }
        consortium.consortiumLotteries.push(consortiumLottery);
        await consortium.save()
        return lottery;
    }

    async get(id: any): Promise<Lottery> {
        return await this.lotteryModel.findById(id).exec();
    }
}
