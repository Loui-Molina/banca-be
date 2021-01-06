import { Module } from '@nestjs/common';
import { BankingModule } from '../banking/banking.module';
import { ConsortiumModule } from '../consortiums/consortium.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { DatabaseModule } from '../database/database.module';
import { ResultsModule } from '../results/results.module';
import { TransactionModule } from '../transactions/transaction.module';
import { UsersModule } from '../users/users.module';
import {AdminLotteryModule} from "@src/modules/lotteries/admin/admin.lottery.module";
import {ConsortiumLotteryModule} from "@src/modules/lotteries/consortium/consortium.lottery.module";

@Module({
    imports:[   
        UsersModule,
        DatabaseModule,
        ResultsModule,
        ConsortiumModule,
        TransactionModule,
        DashboardModule,
        BankingModule,
        AdminLotteryModule,
        ConsortiumLotteryModule
    ],
    controllers:[],
    providers:[],
    exports:[
        UsersModule,
        DatabaseModule,
        ResultsModule,
        ConsortiumModule,
        TransactionModule,
        DashboardModule,
        BankingModule,
        AdminLotteryModule,
        ConsortiumLotteryModule
    ]
})
export class ManagerModule{  
}