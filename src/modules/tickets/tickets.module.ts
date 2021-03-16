import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Lottery, LotterySchema} from '@database/datamodels/schemas/lottery';
import {ConstApp} from '@utils/const.app';
import {Banking, BankingSchema} from '@database/datamodels/schemas/banking';
import {ConsortiumModule} from '@consortiums/consortium.module';
import {TicketsService} from "@src/modules/tickets/tickets.service";
import {TicketsController} from "@src/modules/tickets/tickets.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Lottery.name, schema: LotterySchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
        ConsortiumModule,
    ],
    providers: [TicketsService],
    controllers: [TicketsController],
    exports: [MongooseModule],
})
export class TicketsModule {}
