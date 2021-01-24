import { Module } from '@nestjs/common';
import { BankingsModule } from '@bankings/bankings.module';
import { ConsortiumModule } from '@consortiums/consortium.module';
import { DashboardModule } from '@dashboard/dashboard.module';
import { DatabaseModule } from '@database/database.module';
import { ResultsModule } from '@results/results.module';
import { TransactionModule } from '@transactions/transaction.module';
import { UsersModule } from '@users/users.module';
import { AdminLotteryModule } from '@lotteries/admin/admin.lottery.module';
import { ConsortiumLotteryModule } from '@lotteries/consortium/consortium.lottery.module';
import { BettingPanelModule } from '@betting.panel/betting.panel.module';
import { BankingLotteryModule } from '@lotteries/banking/banking.lottery.module';

@Module({
    imports: [
        UsersModule,
        DatabaseModule,
        ResultsModule,
        ConsortiumModule,
        BettingPanelModule,
        TransactionModule,
        DashboardModule,
        BankingsModule,
        AdminLotteryModule,
        ConsortiumLotteryModule,
        BankingLotteryModule,
    ],
    controllers: [],
    providers: [],
    exports: [
        UsersModule,
        DatabaseModule,
        ResultsModule,
        ConsortiumModule,
        BettingPanelModule,
        TransactionModule,
        DashboardModule,
        BankingsModule,
        AdminLotteryModule,
        ConsortiumLotteryModule,
        BankingLotteryModule,
    ],
})
export class ManagerModule {}
