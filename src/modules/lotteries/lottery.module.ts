import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {LotteryService} from "@src/modules/lotteries/lottery.service";
import {LotteryController} from "@src/modules/lotteries/lottery.controller";
import {LotteryTime, LotteryTimeSchema} from "@src/modules/database/datamodels/schemas/lottery.time";
import {Lottery, LotterySchema} from "@src/modules/database/datamodels/schemas/lottery";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Lottery.name, schema: LotterySchema }], 'banca'),
        MongooseModule.forFeature([{ name: LotteryTime.name, schema: LotteryTimeSchema }], 'banca'),
    ],
    providers: [LotteryService],
    controllers: [LotteryController],
    exports: [MongooseModule],
})
export class LotteryModule {}
