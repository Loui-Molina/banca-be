import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@users/users.module';
import { AuthUserModule } from '@src/modules/auth.user/auth.user.module';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';
import { Bet, BetSchema } from '@database/datamodels/schemas/bet';
import { BettingPanelService } from '@src/modules/bettingPanel/bettingPanel.service';
import { BettingPanelController } from '@src/modules/bettingPanel/bettingPanel.controller';

@Module({
    imports: [
        UsersModule,
        AuthUserModule,
        MongooseModule.forFeature([{ name: Bet.name, schema: BetSchema }], 'banca'),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], 'banca'),
    ],
    providers: [BettingPanelService],
    controllers: [BettingPanelController],
    exports: [BettingPanelService],
})
export class BettingPanelModule {}
