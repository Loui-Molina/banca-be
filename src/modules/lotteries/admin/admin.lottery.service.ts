import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminLotteryReqDto } from '@src/modules/lotteries/admin/dtos/admin.lottery.req.dto';
import { LotteryTime } from '@database/datamodels/schemas/lottery.time';
import { Lottery } from '@database/datamodels/schemas/lottery';
import { Result } from '@database/datamodels/schemas/result';
import { Draw } from '@database/datamodels/schemas/draw';
import { User } from '@database/datamodels/schemas/user';
import { AdminLotteryResDto } from '@src/modules/lotteries/admin/dtos/admin.lottery.res.dto';

@Injectable()
export class AdminLotteryService {
    constructor(
        @InjectModel(Lottery.name) private readonly lotteryModel: Model<Lottery>,
        @InjectModel(LotteryTime.name) private readonly lotteryTimeModel: Model<LotteryTime>,
        @InjectModel(Result.name) private readonly resultModel: Model<Result>,
        @InjectModel(Draw.name) private readonly drawModel: Model<Draw>,
    ) {}

    async getAll(): Promise<Array<AdminLotteryResDto>> {
        return this.lotteryModel.aggregate([
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
    }

    async getFiltered(q: string, value: string): Promise<Array<AdminLotteryResDto>> {
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
                    day: '$time.day',
                },
            },
        ]);
    }

    async create(dto: AdminLotteryReqDto, loggedUser: User): Promise<AdminLotteryResDto> {
        const newLottery = new this.lotteryModel({
            name: dto.name,
            nickname: dto.nickname,
            color: dto.color,
            status: dto.status,
            playTime: dto.playTime,
            time: new this.lotteryTimeModel({
                day: dto.day,
                openTime: dto.openTime,
                closeTime: dto.closeTime,
            }),
            creationUserId: loggedUser.id,
            modificationUserId: loggedUser.id,
        });
        await newLottery.save();
        return {
            _id: newLottery._id,
            name: newLottery.name,
            nickname: newLottery.nickname,
            color: newLottery.color,
            playTime: newLottery.playTime,
            status: newLottery.status,
            results: newLottery.results,
            openTime: newLottery.time.openTime,
            closeTime: newLottery.time.closeTime,
            day: newLottery.time.day,
        } as AdminLotteryResDto;
    }

    async update(dto: AdminLotteryReqDto, loggedUser: User): Promise<AdminLotteryResDto> {
        const time: LotteryTime = new this.lotteryTimeModel({
            day: dto.day,
            openTime: dto.openTime,
            closeTime: dto.closeTime,
        });
        const foundLottery: Lottery = await this.lotteryModel.findByIdAndUpdate(
            dto._id,
            {
                name: dto.name,
                nickname: dto.nickname,
                color: dto.color,
                status: dto.status,
                playTime: dto.playTime,
                time: time,
                modificationUserId: loggedUser._id,
            },
            {
                new: false,
            },
        );
        return {
            _id: foundLottery._id,
            name: foundLottery.name,
            nickname: foundLottery.nickname,
            color: foundLottery.color,
            playTime: foundLottery.playTime,
            status: foundLottery.status,
            results: foundLottery.results,
            openTime: foundLottery.time.openTime,
            closeTime: foundLottery.time.closeTime,
            day: foundLottery.time.day,
        } as AdminLotteryResDto;
    }

    async delete(id: string) {
        //TODO eliminar consortiumLotteries dentro de consortiums
        const promise = await this.lotteryModel.findByIdAndRemove(id).exec();
        console.log(`delete response ${promise}`);
        return promise;
    }

    async get(id: string): Promise<AdminLotteryResDto> {
        const foundLottery = await this.lotteryModel.findById(id).exec();
        return {
            _id: foundLottery._id,
            name: foundLottery.name,
            nickname: foundLottery.nickname,
            color: foundLottery.color,
            playTime: foundLottery.playTime,
            status: foundLottery.status,
            results: foundLottery.results,
            openTime: foundLottery.time.openTime,
            closeTime: foundLottery.time.closeTime,
            day: foundLottery.time.day,
        } as AdminLotteryResDto;
    }
}
