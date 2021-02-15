import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUserModule } from '../auth.user/auth.user.module';
import { ConsortiumModule } from '../consortiums/consortium.module';
import { Banking, BankingSchema } from '../database/datamodels/schemas/banking';
import { ConstApp } from '../utils/const.app';
import { BankingsController } from './bankings.controller';
import { BankingsService } from './bankings.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
        AuthUserModule,
        ConsortiumModule,
    ],
    controllers: [BankingsController],
    providers: [BankingsService],
    exports: [BankingsService],
})
export class BankingsModule {}
