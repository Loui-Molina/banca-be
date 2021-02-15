import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Result, ResultSchema } from '@database/datamodels/schemas/result';
import { Draw, DrawSchema } from '@database/datamodels/schemas/draw';
import { ResultsService } from '@results/results.service';
import { ResultsController } from '@results/results.controller';
import { Lottery, LotterySchema } from '@database/datamodels/schemas/lottery';
import { ConstApp } from '@utils/const.app';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';
import { Consortium, ConsortiumSchema } from '@database/datamodels/schemas/consortium';
import { User, UserSchema } from '@database/datamodels/schemas/user';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Lottery.name, schema: LotterySchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Draw.name, schema: DrawSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], ConstApp.USER),
    ],
    providers: [ResultsService],
    controllers: [ResultsController],
    exports: [MongooseModule],
})
export class ResultsModule {}
