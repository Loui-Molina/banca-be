import { Module } from '@nestjs/common';
import { AccountingController } from '@src/modules/Accounting/accounting.controller';
import { AccountingService } from '@src/modules/Accounting/accounting.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';
import { ConstApp } from '@utils/const.app';
import { BankingAccounting, BankingAccountingSchema } from '@database/datamodels/schemas/bankingAccounting';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
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
