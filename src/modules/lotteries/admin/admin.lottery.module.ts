import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {AdminLotteryService} from "@src/modules/lotteries/admin/admin.lottery.service";
import {AdminLotteryController} from "@src/modules/lotteries/admin/admin.lottery.controller";
import {LotteryTime, LotteryTimeSchema} from "@database/datamodels/schemas/lottery.time";
import {Lottery, LotterySchema} from "@database/datamodels/schemas/lottery";
import {Result, ResultSchema } from '@database/datamodels/schemas/result';
import { Draw, DrawSchema } from '@database/datamodels/schemas/draw';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Lottery.name, schema: LotterySchema }], 'banca'),
        MongooseModule.forFeature([{ name: LotteryTime.name, schema: LotteryTimeSchema }], 'banca'),
        MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }], 'banca'),
        MongooseModule.forFeature([{ name: Draw.name, schema: DrawSchema }], 'banca'),
    ],
    providers: [AdminLotteryService],
    controllers: [AdminLotteryController],
    exports: [MongooseModule],
})
export class AdminLotteryModule {}
