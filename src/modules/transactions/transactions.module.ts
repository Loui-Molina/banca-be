import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BankingsModule } from '../bankings/bankings.module';
import { ConsortiumModule } from '../consortiums/consortium.module';
import { Banking, BankingSchema } from '../database/datamodels/schemas/banking';
import { Consortium, ConsortiumSchema } from '../database/datamodels/schemas/consortium';
import { Transaction, TransactionSchema } from '../database/datamodels/schemas/transaction';
import { WebUser, WebUserSchema } from '../database/datamodels/schemas/web.user';
import { ConstApp } from '../utils/const.app';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transactions.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: WebUser.name, schema: WebUserSchema }], ConstApp.BANKING),
        ConsortiumModule,
        BankingsModule,
    ],
    providers: [TransactionService],
    controllers: [TransactionController],
    exports: [TransactionService, MongooseModule],
})
export class TransactionsModule {}
