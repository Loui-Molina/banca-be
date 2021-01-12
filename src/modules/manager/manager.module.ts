import { Module } from '@nestjs/common';
import { BankingModule } from '@src/modules/banking/banking.module';
import { ConsortiumModule } from '@src/modules/consortiums/consortium.module';
import { DashboardModule } from '@src/modules/dashboard/dashboard.module';
import { DatabaseModule } from '@database/database.module';
import { ResultsModule } from '@src/modules/results/results.module';
import { TransactionModule } from '@src/modules/transactions/transaction.module';
import { UsersModule } from '@users/users.module';
import { AdminLotteryModule } from '@src/modules/lotteries/admin/admin.lottery.module';
import { ConsortiumLotteryModule } from '@src/modules/lotteries/consortium/consortium.lottery.module';
import { BettingPanelModule } from '@src/modules/bettingPanel/bettingPanel.module';
import { BankingLotteryModule } from '@src/modules/lotteries/banking/banking.lottery.module';

@Module({
    imports: [
        UsersModule,
        DatabaseModule,
        ResultsModule,
        ConsortiumModule,
        BettingPanelModule,
        TransactionModule,
        DashboardModule,
        BankingModule,
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
        BankingModule,
        AdminLotteryModule,
        ConsortiumLotteryModule,
        BankingLotteryModule,
    ],
})
export class ManagerModule {}
