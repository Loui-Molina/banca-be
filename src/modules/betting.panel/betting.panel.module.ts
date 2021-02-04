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

@Module({
    imports: [
        UsersModule,
        AuthUserModule,
        BankingsModule,
        MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Lottery.name, schema: LotterySchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Bet.name, schema: BetSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
    ],
    providers: [BettingPanelService],
    controllers: [BettingPanelController],
    exports: [BettingPanelService],
})
export class BettingPanelModule {}
