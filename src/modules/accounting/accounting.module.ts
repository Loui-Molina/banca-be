import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';
import { ConstApp } from '@utils/const.app';
import { BankingAccounting, BankingAccountingSchema } from '@database/datamodels/schemas/bankingAccounting';
import { Consortium, ConsortiumSchema } from '@database/datamodels/schemas/consortium';
import { AccountingController } from './accounting.controller';
import { AccountingService } from './accounting.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], ConstApp.BANKING),
        MongooseModule.forFeature(
            [{ name: BankingAccounting.name, schema: BankingAccountingSchema }],
            ConstApp.BANKING,
        ),
    ],
    controllers: [AccountingController],
    providers: [AccountingService],
    exports: [AccountingService],
})
export class AccountingModule {}
