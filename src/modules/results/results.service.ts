import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Result } from '@database/datamodels/schemas/result';
import { Draw } from '@database/datamodels/schemas/draw';
import { User } from '@database/datamodels/schemas/user';
import { ResultDto } from '@src/modules/results/dtos/result.dto';
import { Lottery } from '@database/datamodels/schemas/lottery';
import { AddResultDto } from '@src/modules/results/dtos/add.result.dto';
import { Model } from 'mongoose';

@Injectable()
export class ResultsService {
    constructor(
        @InjectModel(Lottery.name) private readonly lotteryModel: Model<Lottery>,
        @InjectModel(Result.name) private readonly resultModel: Model<Result>,
        @InjectModel(Draw.name) private readonly drawModel: Model<Draw>,
    ) {}

    async getAll(): Promise<Array<ResultDto>> {
        return this.lotteryModel.aggregate([
            { $match: {} },
            { $unwind: '$results' },
            {
                $project: {
                    _id: '$results._id',
                    date: '$results.date',
                    createdAt: '$results.createdAt',
                    draw: '$results.draw',
                    lotteryId: '$_id',
                    lotteryName: '$name',
                },
            },
            { $sort: { date: -1 } },
        ]);
    }

    async create(dto: AddResultDto, loggedUser: User): Promise<Result> {
        //TODO chekear si la fecha de sorteo ya paso
        const lottery = await this.lotteryModel.findById(dto.lotteryId).exec();
        if (!lottery) {
            throw new BadRequestException();
        }

        //First time of date and last
        const date = new Date(dto.date);
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        const filterDateA = new Date(`${date.getFullYear()}-${month}-${day}T00:00:00.000Z`);
        const filterDateB = new Date(`${date.getFullYear()}-${month}-${day}T23:59:59.000Z`);

        //Checking playTime
        const lotteryPlayTime = lottery.playTime.split(':');
        const checkDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            parseInt(lotteryPlayTime[0]),
            parseInt(lotteryPlayTime[1]),
            0,
        );
        const now = new Date();

        if (now < checkDate) {
            //You cant add the results if the lottery has not been played yet
            throw new BadRequestException();
        }

        let results = await this.lotteryModel.aggregate([
            { $match: { 'results.date': { $gte: filterDateA, $lt: filterDateB } } },
            { $unwind: '$results' },
            {
                $project: {
                    _id: '$results._id',
                    lotteryId: '$_id',
                },
            },
        ]);
        results = results.filter((result: ResultDto) => result.lotteryId.toString() === dto.lotteryId);
        if (results && results.length > 0) {
            throw new BadRequestException();
        }

        const draw: Draw = new this.drawModel({
            first: dto.first,
            second: dto.second,
            third: dto.third,
            creationUserId: loggedUser.id,
            modificationUserId: loggedUser.id,
        });
        const result: Result = new this.resultModel({
            date: filterDateA,
            createdAt: new Date(),
            draw: draw,
            creationUserId: loggedUser.id,
            modificationUserId: loggedUser.id,
        });
        if (
            filterDateA.getDate() == now.getDate() &&
            filterDateA.getMonth() == now.getMonth() &&
            filterDateA.getFullYear() == now.getFullYear()
        ) {
            lottery.lastDraw = draw;
        }
        lottery.results.push(result);
        await lottery.save();
        //TODO Calcular ganadores
        return result;
    }

    async get(id: string): Promise<Result> {
        return await this.resultModel.findById(id).exec();
    }
}
