import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from '@src/modules/transactions/transaction.service';
import { TransactionController } from '@src/modules/transactions/transaction.controller';
import { Transaction, TransactionSchema } from "@src/modules/database/datamodels/schemas/transaction";

@Module({
    imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }], 'banca')],
    providers: [TransactionService],
    controllers: [TransactionController],
    exports: [TransactionService, MongooseModule],
})
export class TransactionModule {}
