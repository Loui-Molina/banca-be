import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUserModule } from '../auth.user/auth.user.module';
import { BankingsModule } from '../bankings/bankings.module';
import { Banking, BankingSchema } from '../database/datamodels/schemas/banking';
import { Bet, BetSchema } from '../database/datamodels/schemas/bet';
import { Lottery, LotterySchema } from '../database/datamodels/schemas/lottery';
import { PlayPool, PlayPoolSchema } from '../database/datamodels/schemas/playPool';
import { Transaction, TransactionSchema } from '../database/datamodels/schemas/transaction';
import { BankingLotteryModule } from '../lotteries/banking/banking.lottery.module';
import { BankingLotteryService } from '../lotteries/banking/banking.lottery.service';
import { UsersModule } from '../users/users.module';
import { ConstApp } from '../utils/const.app';
import { BettingPanelController } from './betting.panel.controller';
import { BettingPanelService } from './betting.panel.service';

@Module({
    imports: [
        UsersModule,
        AuthUserModule,
        BankingsModule,
        BankingLotteryModule,
        MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Lottery.name, schema: LotterySchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Bet.name, schema: BetSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: PlayPool.name, schema: PlayPoolSchema }], ConstApp.BANKING),
    ],
    providers: [BettingPanelService, BankingLotteryService],
    controllers: [BettingPanelController],
    exports: [BettingPanelService],
})
export class BettingPanelModule {}
