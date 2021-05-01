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
import { TicketsModule } from '@src/modules/tickets/tickets.module';
import { TicketsWebModule } from '@src/modules/tickets.web/tickets.web.module';
import { AccountingModule } from '@src/modules/accounting/accounting.module';

const modules = [
    AccountingModule,
    ResultsModule,
    TicketsModule,
    TicketsWebModule,
    ConsortiumModule,
    BettingPanelModule,
    TransactionsModule,
    DashboardModule,
    BankingsModule,
    LotteriesModule,
    ChatModule,
    WebUsersModule,
    SubscriptionsModule,
];

@Module({
    imports: [...modules],
    controllers: [],
    providers: [],
    exports: [...modules],
})
export class CoreModule {}
