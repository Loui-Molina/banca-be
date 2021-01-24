import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@users/users.module';
import { AuthUserModule } from '@auth.user/auth.user.module';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';
import { Bet, BetSchema } from '@database/datamodels/schemas/bet';
import { BettingPanelService } from '@betting.panel/betting.panel.service';
import { BettingPanelController } from '@betting.panel/betting.panel.controller';

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
