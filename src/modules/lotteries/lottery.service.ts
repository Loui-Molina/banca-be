import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {LotteryDto} from "@src/modules/lotteries/dtos/lottery.dto";
import {LotteryTime, LotteryTimeDocument} from "@src/modules/database/datamodels/schemas/lottery.time";
import {Lottery, LotteryDocument} from "@src/modules/database/datamodels/schemas/l1ottery";

@Injectable()
export class LotteryService {
    constructor(
        @InjectModel(Lottery.name) private lotteryModel: Model<LotteryDocument>,
        @InjectModel(LotteryTime.name) private lotteryTimeModel: Model<LotteryTimeDocument>,
    ) {
    }

    async getAll(): Promise<Array<LotteryDto>> {
        //TODO CHECK WHY IS IT ALL IN THE SAME COLLECTION AND IF IT WORKS ON SEPARATE ONES
        return this.lotteryModel.aggregate([{$match: {}},
            {
                $project: {
                    _id: '$_id',
                    name: '$name',
                    nickname: '$nickname',
                    color: '$color',
                    creationUserId: '$creationUserId',
                    modificationUserId: '$modificationUserId',
                    status: '$status',
                    openTime: '$time.openTime',
                    closeTime: '$time.closeTime',
                    day: '$time.day'
                }
            }]);
    }

    async getFiltered(q: string, value: string): Promise<Array<LotteryDto>> {
        return this.lotteryModel.aggregate([{$match: {[q]: value}},
            {
                $project: {
                    _id: '$_id',
                    name: '$name',
                    nickname: '$nickname',
                    color: '$color',
                    creationUserId: '$creationUserId',
                    modificationUserId: '$modificationUserId',
                    status: '$status',
                    openTime: '$time.openTime',
                    closeTime: '$time.closeTime',
                    day: '$time.day'
                }
            }])
    }

    async create(dto: LotteryDto): Promise<Lottery> {
        const time: LotteryTime = new this.lotteryTimeModel({
            day: dto.day,
            openTime: dto.openTime,
            closeTime: dto.closeTime
        });
        const newObject = new this.lotteryModel({
            name:dto.name,
            nickname:dto.nickname,
            color:dto.color,
            status:dto.status,
            time: time,
            creationUserId: '1', //TODO Use logged user for this
            modificationUserId: '1', //TODO Use logged user for this
        });
        await newObject.save();
        return newObject;
    }

    async update(dto: LotteryDto): Promise<Lottery> {
        const time: LotteryTime = new this.lotteryTimeModel({
            day: dto.day,
            openTime: dto.openTime,
            closeTime: dto.closeTime
        });
        return this.lotteryModel.findByIdAndUpdate(
            dto._id,
            {
                name: dto.name,
                nickname: dto.nickname,
                color: dto.color,
                status: dto.status,
                time: time,
                modificationUserId: '1' //TODO Use logged user for this
            },
            {
                new: false,
            },
        );
    }

    async delete(id: string): Promise<Lottery> {
        return this.lotteryModel.findByIdAndRemove(id).exec();
    }

    async get(id: string): Promise<Lottery> {
        return await this.lotteryModel.findById(id).exec();
    }
}
