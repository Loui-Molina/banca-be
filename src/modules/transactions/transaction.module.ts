import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from '@src/modules/transactions/transaction.service';
import { TransactionController } from '@src/modules/transactions/transaction.controller';
import { Transaction, TransactionSchema } from '@src/modules/database/datamodels/schemas/transaction';
import { Consortium, ConsortiumSchema } from '@database/datamodels/schemas/consortium';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';
import { ConsortiumModule } from '@src/modules/consortiums/consortium.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }], 'banca'),
        MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], 'banca'),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], 'banca'),
        ConsortiumModule,
    ],
    providers: [TransactionService],
    controllers: [TransactionController],
    exports: [TransactionService, MongooseModule],
})
export class TransactionModule {}
