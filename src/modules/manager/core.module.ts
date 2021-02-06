import { Module } from '@nestjs/common';
import { BankingsModule } from '@bankings/bankings.module';
import { ConsortiumModule } from '@consortiums/consortium.module';
import { DashboardModule } from '@dashboard/dashboard.module';
import { ResultsModule } from '@results/results.module';
import { TransactionsModule } from '@transactions/transactions.module';
import { BettingPanelModule } from '@betting.panel/betting.panel.module';
import { LotteriesModule } from '@lotteries/lotteries.module';
import { ChatModule } from '@src/modules/chat/chat.module';
import { SubscriptionsModule } from '@src/modules/subscriptions/subscriptions.module';

@Module({
    imports: [
        ResultsModule,
        ConsortiumModule,
        BettingPanelModule,
        TransactionsModule,
        DashboardModule,
        BankingsModule,
        LotteriesModule,
        ChatModule,
        SubscriptionsModule,
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
        ChatModule,
        SubscriptionsModule,
    ],
})
export class CoreModule {}
