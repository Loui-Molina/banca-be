import { Module } from '@nestjs/common';
import { BankingsModule } from '../bankings/bankings.module';
import { BettingPanelModule } from '../betting.panel/betting.panel.module';
import { ChatModule } from '../chat/chat.module';
import { ConsortiumModule } from '../consortiums/consortium.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { LotteriesModule } from '../lotteries/lotteries.module';
import { ResultsModule } from '../results/results.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { WebUsersModule } from '../web-users/web.users.module';


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
        WebUsersModule,
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
        WebUsersModule,
        SubscriptionsModule,
    ],
})
export class CoreModule {}
