import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Result, ResultSchema } from '@database/datamodels/schemas/result';
import { Draw, DrawSchema } from '@database/datamodels/schemas/draw';
import { ResultsService } from '@results/results.service';
import { ResultsController } from '@results/results.controller';
import { Lottery, LotterySchema } from '@database/datamodels/schemas/lottery';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Lottery.name, schema: LotterySchema }], 'banca'),
        MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }], 'banca'),
        MongooseModule.forFeature([{ name: Draw.name, schema: DrawSchema }], 'banca'),
    ],
    providers: [ResultsService],
    controllers: [ResultsController],
    exports: [MongooseModule],
})
export class ResultsModule {}
