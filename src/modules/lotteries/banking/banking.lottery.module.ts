import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LotteryTime, LotteryTimeSchema } from '@database/datamodels/schemas/lottery.time';
import { Lottery, LotterySchema } from '@database/datamodels/schemas/lottery';
import { Result, ResultSchema } from '@database/datamodels/schemas/result';
import { Draw, DrawSchema } from '@database/datamodels/schemas/draw';
import { ConsortiumLottery, ConsortiumLotterySchema } from '@database/datamodels/schemas/consortium.lottery';
import { Consortium, ConsortiumSchema } from '@database/datamodels/schemas/consortium';
import { BankingLotteryService } from '@src/modules/lotteries/banking/banking.lottery.service';
import { BankingLotteryController } from '@src/modules/lotteries/banking/banking.lottery.controller';
import {Banking, BankingSchema} from "@database/datamodels/schemas/banking";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Lottery.name, schema: LotterySchema }], 'banca'),
        MongooseModule.forFeature([{ name: LotteryTime.name, schema: LotteryTimeSchema }], 'banca'),
        MongooseModule.forFeature([{ name: ConsortiumLottery.name, schema: ConsortiumLotterySchema }], 'banca'),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], 'banca'),
        MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], 'banca'),
        MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }], 'banca'),
        MongooseModule.forFeature([{ name: Draw.name, schema: DrawSchema }], 'banca'),
    ],
    providers: [BankingLotteryService],
    controllers: [BankingLotteryController],
    exports: [MongooseModule],
})
export class BankingLotteryModule {}
