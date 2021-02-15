import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@users/users.module';
import { AuthUserModule } from '@auth.user/auth.user.module';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';
import { Bet, BetSchema } from '@database/datamodels/schemas/bet';
import { BettingPanelService } from '@betting.panel/betting.panel.service';
import { BettingPanelController } from '@betting.panel/betting.panel.controller';
import { ConstApp } from '@utils/const.app';
import { BankingsModule } from '@bankings/bankings.module';
import { Transaction, TransactionSchema } from '@database/datamodels/schemas/transaction';
import { Lottery, LotterySchema } from '@database/datamodels/schemas/lottery';
import { PlayPool, PlayPoolSchema } from '@database/datamodels/schemas/playPool';
import { BankingLotteryModule } from '@lotteries/banking/banking.lottery.module';
import { BankingLotteryService } from '@lotteries/banking/banking.lottery.service';
import { WebUser, WebUserSchema } from '@database/datamodels/schemas/web.user';

@Module({
    imports: [
        UsersModule,
        AuthUserModule,
        BankingsModule,
        BankingLotteryModule,
        MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Lottery.name, schema: LotterySchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Bet.name, schema: BetSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: WebUser.name, schema: WebUserSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: PlayPool.name, schema: PlayPoolSchema }], ConstApp.BANKING),
    ],
    providers: [BettingPanelService, BankingLotteryService],
    controllers: [BettingPanelController],
    exports: [BettingPanelService],
})
export class BettingPanelModule {}
