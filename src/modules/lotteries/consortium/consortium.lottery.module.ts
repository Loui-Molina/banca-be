import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LotteryTime, LotteryTimeSchema } from '@database/datamodels/schemas/lottery.time';
import { Lottery, LotterySchema } from '@database/datamodels/schemas/lottery';
import { Result, ResultSchema } from '@database/datamodels/schemas/result';
import { Draw, DrawSchema } from '@database/datamodels/schemas/draw';
import { ConsortiumLotteryService } from '@lotteries/consortium/consortium.lottery.service';
import { ConsortiumLotteryController } from '@lotteries/consortium/consortium.lottery.controller';
import { ConsortiumLottery, ConsortiumLotterySchema } from '@database/datamodels/schemas/consortium.lottery';
import { Consortium, ConsortiumSchema } from '@database/datamodels/schemas/consortium';
import { ConstApp } from '@utils/const.app';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Lottery.name, schema: LotterySchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: LotteryTime.name, schema: LotteryTimeSchema }], ConstApp.BANKING),
        MongooseModule.forFeature(
            [{ name: ConsortiumLottery.name, schema: ConsortiumLotterySchema }],
            ConstApp.BANKING,
        ),
        MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Draw.name, schema: DrawSchema }], ConstApp.BANKING),
    ],
    providers: [ConsortiumLotteryService],
    controllers: [ConsortiumLotteryController],
    exports: [MongooseModule],
})
export class ConsortiumLotteryModule {}
