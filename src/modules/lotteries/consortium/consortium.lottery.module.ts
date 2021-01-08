import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LotteryTime, LotteryTimeSchema } from '@database/datamodels/schemas/lottery.time';
import { Lottery, LotterySchema } from '@database/datamodels/schemas/lottery';
import { Result, ResultSchema } from '@database/datamodels/schemas/result';
import { Draw, DrawSchema } from '@database/datamodels/schemas/draw';
import { ConsortiumLotteryService } from '@src/modules/lotteries/consortium/consortium.lottery.service';
import { ConsortiumLotteryController } from '@src/modules/lotteries/consortium/consortium.lottery.controller';
import { ConsortiumLottery, ConsortiumLotterySchema } from '@database/datamodels/schemas/consortium.lottery';
import { Consortium, ConsortiumSchema } from '@database/datamodels/schemas/consortium';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Lottery.name, schema: LotterySchema }], 'banca'),
        MongooseModule.forFeature([{ name: LotteryTime.name, schema: LotteryTimeSchema }], 'banca'),
        MongooseModule.forFeature([{ name: ConsortiumLottery.name, schema: ConsortiumLotterySchema }], 'banca'),
        MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], 'banca'),
        MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }], 'banca'),
        MongooseModule.forFeature([{ name: Draw.name, schema: DrawSchema }], 'banca'),
    ],
    providers: [ConsortiumLotteryService],
    controllers: [ConsortiumLotteryController],
    exports: [MongooseModule],
})
export class ConsortiumLotteryModule {}
