import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LotteryTime, LotteryTimeSchema } from '@database/datamodels/schemas/lottery.time';
import { Lottery, LotterySchema } from '@database/datamodels/schemas/lottery';
import { Result, ResultSchema } from '@database/datamodels/schemas/result';
import { Draw, DrawSchema } from '@database/datamodels/schemas/draw';
import { ConsortiumLottery, ConsortiumLotterySchema } from '@database/datamodels/schemas/consortium.lottery';
import { Consortium, ConsortiumSchema } from '@database/datamodels/schemas/consortium';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';
import { ConstApp } from '@utils/const.app';
import { WebUserLotteryService } from '@lotteries/web-user/web-user.lottery.service';
import { WebUserLotteryController } from '@lotteries/web-user/web-user.lottery.controller';
import { WebUser, WebUserSchema } from '@database/datamodels/schemas/web.user';

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
