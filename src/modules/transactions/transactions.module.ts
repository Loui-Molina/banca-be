import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsortiumModule } from '@consortiums/consortium.module';
import { TransactionService } from '@transactions/transactions.service';
import { TransactionController } from '@transactions/transactions.controller';
import { Transaction, TransactionSchema } from '@database/datamodels/schemas/transaction';
import { Consortium, ConsortiumSchema } from '@database/datamodels/schemas/consortium';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';
import { ConstApp } from '@utils/const.app';
import { BankingsModule } from '@bankings/bankings.module';
import { WebUser, WebUserSchema } from '@database/datamodels/schemas/web.user';
import {User, UserSchema} from "@database/datamodels/schemas/user";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: WebUser.name, schema: WebUserSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], ConstApp.USER),
        ConsortiumModule,
        BankingsModule,
    ],
    providers: [TransactionService],
    controllers: [TransactionController],
    exports: [TransactionService, MongooseModule],
})
export class TransactionsModule {}
