import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {LotteryService} from "@src/modules/lotterys/lottery.service";
import {Lottery, LotterySchema} from "@database/datamodels/schemas/Lottery";
import {LotteryController} from "@src/modules/lotterys/lottery.controller";
import {LotteryTime, LotteryTimeSchema} from "@database/datamodels/schemas/LotteryTime";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Lottery.name, schema: LotterySchema }], 'banca'),
        MongooseModule.forFeature([{ name: LotteryTime.name, schema: LotteryTimeSchema }], 'banca'),
    ],
    providers: [LotteryService],
    controllers: [LotteryController],
    exports: [LotteryService, MongooseModule],
})
export class LotteryModule {}
