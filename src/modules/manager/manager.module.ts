import { Module } from '@nestjs/common';
import { BankingsModule } from '@bankings/bankings.module';
import { ConsortiumModule } from '@consortiums/consortium.module';
import { DashboardModule } from '@dashboard/dashboard.module';
import { ResultsModule } from '@results/results.module';
import { TransactionsModule } from '@src/modules/transactions/transactions.module';
import { AdminLotteryModule } from '@lotteries/admin/admin.lottery.module';
import { ConsortiumLotteryModule } from '@lotteries/consortium/consortium.lottery.module';
import { BettingPanelModule } from '@betting.panel/betting.panel.module';
import { BankingLotteryModule } from '@lotteries/banking/banking.lottery.module';

@Module({
    imports: [
        ResultsModule,
        ConsortiumModule,
        BettingPanelModule,
        TransactionsModule,
        DashboardModule,
        BankingsModule,
        AdminLotteryModule,
        ConsortiumLotteryModule,
        BankingLotteryModule,
    ],
    controllers: [],
    providers: [],
    exports: [
        ResultsModule,
        ConsortiumModule,
        BettingPanelModule,
        TransactionsModule,
        DashboardModule,
        BankingsModule,
        AdminLotteryModule,
        ConsortiumLotteryModule,
        BankingLotteryModule,
    ],
})
export class ManagerModule {}
