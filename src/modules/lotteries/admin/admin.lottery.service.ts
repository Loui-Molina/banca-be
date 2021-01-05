import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {AdminLotteryDto} from "@src/modules/lotteries/admin/dtos/admin.lottery.dto";
import {LotteryTime, LotteryTimeDocument} from "@database/datamodels/schemas/lottery.time";
import {Lottery, LotteryDocument} from "@database/datamodels/schemas/lottery";
import {Result, ResultDocument } from '@database/datamodels/schemas/result';
import {Draw, DrawDocument} from '@database/datamodels/schemas/draw';
import {UserDocument} from "@database/datamodels/schemas/user";

@Injectable()
export class AdminLotteryService {
    constructor(
        @InjectModel(Lottery.name) private lotteryModel: Model<LotteryDocument>,
        @InjectModel(LotteryTime.name) private lotteryTimeModel: Model<LotteryTimeDocument>,
        @InjectModel(Result.name) private resultModel: Model<ResultDocument>,
        @InjectModel(Draw.name) private drawModel: Model<DrawDocument>,
    ) {    }

    async getAll(): Promise<Array<AdminLotteryDto>> {
        return this.lotteryModel.aggregate([{$match: {}},
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
    }

    async getFiltered(q: string, value: string): Promise<Array<AdminLotteryDto>> {
        return this.lotteryModel.aggregate([
            { $match: { [q]: value } },
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
            }])
    }

    async create(dto: AdminLotteryDto, loggedUser: UserDocument): Promise<Lottery> {
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
            playTime:dto.playTime,
            time: time,
            creationUserId: loggedUser.id,
            modificationUserId: loggedUser.id,
        });
        await newObject.save();
        return newObject;
    }

    async update(dto: AdminLotteryDto, loggedUser: UserDocument): Promise<Lottery> {
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
                playTime: dto.playTime,
                time: time,
                modificationUserId: loggedUser.id
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
