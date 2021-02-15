import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Consortium, ConsortiumSchema } from 'src/modules/database/datamodels/schemas/consortium';
import { ConsortiumLottery, ConsortiumLotterySchema } from 'src/modules/database/datamodels/schemas/consortium.lottery';
import { Draw, DrawSchema } from 'src/modules/database/datamodels/schemas/draw';
import { Lottery, LotterySchema } from 'src/modules/database/datamodels/schemas/lottery';
import { LotteryTime, LotteryTimeSchema } from 'src/modules/database/datamodels/schemas/lottery.time';
import { Result, ResultSchema } from 'src/modules/database/datamodels/schemas/result';
import { ConstApp } from 'src/modules/utils/const.app';
import { ConsortiumLotteryController } from './consortium.lottery.controller';
import { ConsortiumLotteryService } from './consortium.lottery.service';


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
