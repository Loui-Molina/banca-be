import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {LotteryService} from "@src/modules/lotteries/lottery.service";
import {LotteryController} from "@src/modules/lotteries/lottery.controller";
import {LotteryTime, LotteryTimeSchema} from "@src/modules/database/datamodels/schemas/lottery.time";
import {Lottery, LotterySchema} from "@src/modules/database/datamodels/schemas/lottery";
import {Result, ResultSchema } from '@database/datamodels/schemas/result';
import { Draw, DrawSchema } from '@database/datamodels/schemas/draw';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Lottery.name, schema: LotterySchema }], 'banca'),
        MongooseModule.forFeature([{ name: LotteryTime.name, schema: LotteryTimeSchema }], 'banca'),
        MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }], 'banca'),
        MongooseModule.forFeature([{ name: Draw.name, schema: DrawSchema }], 'banca'),
    ],
    providers: [LotteryService],
    controllers: [LotteryController],
    exports: [MongooseModule],
})
export class LotteryModule {}
