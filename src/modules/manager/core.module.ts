import { Module } from '@nestjs/common';
import { BankingsModule } from '@bankings/bankings.module';
import { ConsortiumModule } from '@consortiums/consortium.module';
import { DashboardModule } from '@dashboard/dashboard.module';
import { ResultsModule } from '@results/results.module';
import { TransactionsModule } from '@transactions/transactions.module';
import { BettingPanelModule } from '@betting.panel/betting.panel.module';
import { LotteriesModule } from '@lotteries/lotteries.module';
import { ChatModule } from '@chat/chat.module';
import { SubscriptionsModule } from '@subscriptions/subscriptions.module';
import { WebUsersModule } from '@web.users/web.users.module';
import {TicketsModule} from "@src/modules/tickets/tickets.module";

@Module({
    imports: [
        ResultsModule,
        TicketsModule,
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
        TicketsModule,
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
