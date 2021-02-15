import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Banking, BankingSchema } from 'src/modules/database/datamodels/schemas/banking';
import { Consortium, ConsortiumSchema } from 'src/modules/database/datamodels/schemas/consortium';
import { ConsortiumLottery, ConsortiumLotterySchema } from 'src/modules/database/datamodels/schemas/consortium.lottery';
import { Draw, DrawSchema } from 'src/modules/database/datamodels/schemas/draw';
import { Lottery, LotterySchema } from 'src/modules/database/datamodels/schemas/lottery';
import { LotteryTime, LotteryTimeSchema } from '@src/modules/database/datamodels/schemas/lottery.time';
import { Result, ResultSchema } from 'src/modules/database/datamodels/schemas/result';
import { WebUser, WebUserSchema } from 'src/modules/database/datamodels/schemas/web.user';
import { ConstApp } from 'src/modules/utils/const.app';
import { WebUserLotteryController } from './web-user.lottery.controller';
import { WebUserLotteryService } from './web-user.lottery.service';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Lottery.name, schema: LotterySchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: LotteryTime.name, schema: LotteryTimeSchema }], ConstApp.BANKING),
        MongooseModule.forFeature(
            [{ name: ConsortiumLottery.name, schema: ConsortiumLotterySchema }],
            ConstApp.BANKING,
        ),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Draw.name, schema: DrawSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: WebUser.name, schema: WebUserSchema }], ConstApp.BANKING),
    ],
    providers: [WebUserLotteryService],
    controllers: [WebUserLotteryController],
    exports: [MongooseModule],
})
export class WebUserLotteryModule {}
