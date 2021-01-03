import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Result, ResultDocument} from "@database/datamodels/schemas/result";
import {Draw, DrawDocument} from "@database/datamodels/schemas/draw";
import {UserDocument} from "@database/datamodels/schemas/user";
import {ResultDto} from "@src/modules/results/dtos/result.dto";
import {Lottery, LotteryDocument} from "@database/datamodels/schemas/lottery";
import {AddResultDto} from "@src/modules/results/dtos/add.result.dto";

@Injectable()
export class ResultsService {
    constructor(
        @InjectModel(Lottery.name) private lotteryModel: Model<LotteryDocument>,
        @InjectModel(Result.name) private resultModel: Model<ResultDocument>,
        @InjectModel(Draw.name) private drawModel: Model<DrawDocument>,
    ) {
    }

    async getAll(): Promise<Array<ResultDto>> {
        const lotteries = await this.lotteryModel.find().exec();
        const results: ResultDto[] = [];
        lotteries.map(lottery => {
            lottery.results.map(result => {
                const resultDto: ResultDto = {
                    date: result.date,
                    draw: result.draw,
                    lottery: lottery
                };
                results.push(resultDto);
            });
        });
        return results;
    }

    async create(dto: AddResultDto, loggedUser: UserDocument): Promise<Result> {
        //TODO chekear q no exista resultado
        const lottery = await this.lotteryModel.findById(dto.lotteryId).exec();
        if(!lottery){
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
            date: new Date(),
            draw: draw,
            creationUserId: loggedUser.id,
            modificationUserId: loggedUser.id
        });
        lottery.results.push(result);
        await lottery.save();
        //TODO Calcular ganadores
        return draw;
    }

    async get(id: string): Promise<Result> {
        return await this.lotteryModel.findById(id).exec();
    }

}
