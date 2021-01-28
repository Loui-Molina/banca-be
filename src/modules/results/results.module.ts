import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Result, ResultSchema } from '@database/datamodels/schemas/result';
import { Draw, DrawSchema } from '@database/datamodels/schemas/draw';
import { ResultsService } from '@results/results.service';
import { ResultsController } from '@results/results.controller';
import { Lottery, LotterySchema } from '@database/datamodels/schemas/lottery';
import { ConstApp } from '@utils/const.app';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Lottery.name, schema: LotterySchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Draw.name, schema: DrawSchema }], ConstApp.BANKING),
    ],
    providers: [ResultsService],
    controllers: [ResultsController],
    exports: [MongooseModule],
})
export class ResultsModule {}
