import { Module } from '@nestjs/common';
import { ConsortiumModule } from '@consortiums/consortium.module';
import { AuthUserModule } from '@auth.user/auth.user.module';
import { AccountingController } from '@src/modules/Accounting/accounting.controller';
import { AccountingService } from '@src/modules/Accounting/accounting.service';

@Module({
    imports: [
        // MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
    ],
    controllers: [AccountingController],
    providers: [AccountingService],
    exports: [AccountingService],
})
export class AccountingModule {}
