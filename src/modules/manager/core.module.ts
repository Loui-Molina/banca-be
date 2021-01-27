import { Module } from '@nestjs/common';
import { BankingsModule } from '@bankings/bankings.module';
import { ConsortiumModule } from '@consortiums/consortium.module';
import { DashboardModule } from '@dashboard/dashboard.module';
import { ResultsModule } from '@results/results.module';
import { TransactionsModule } from '@src/modules/transactions/transactions.module';
import { BettingPanelModule } from '@betting.panel/betting.panel.module';
import { LotteriesModule } from '@lotteries/lotteries.module';

@Module({
    imports: [
        ResultsModule,
        ConsortiumModule,
        BettingPanelModule,
        TransactionsModule,
        DashboardModule,
        BankingsModule,
        LotteriesModule,
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
        LotteriesModule,
    ],
})
export class CoreModule {}
