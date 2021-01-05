import { Module } from '@nestjs/common';
import { BankingModule } from '../banking/banking.module';
import { ConsortiumModule } from '../consortiums/consortium.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { DatabaseModule } from '../database/database.module';
import { LotteryModule } from '../lotteries/lottery.module';
import { ResultsModule } from '../results/results.module';
import { TransactionModule } from '../transactions/transaction.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports:[   
        UsersModule,
        DatabaseModule,    
        LotteryModule,
        ResultsModule,
        ConsortiumModule,
        TransactionModule,
        DashboardModule,
        BankingModule,
    ],
    controllers:[],
    providers:[],
    exports:[
        UsersModule,
        DatabaseModule,
        LotteryModule,
        ResultsModule,
        ConsortiumModule,
        TransactionModule,
        DashboardModule,
        BankingModule,
    ]
})
export class ManagerModule{  
}