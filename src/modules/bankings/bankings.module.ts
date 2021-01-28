import { Module } from '@nestjs/common';
import { BankingsService } from '@bankings/bankings.service';
import { BankingsController } from '@bankings/bankings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@users/users.module';
import { ConsortiumModule } from '@consortiums/consortium.module';
import { AuthUserModule } from '@auth.user/auth.user.module';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';
import { ConstApp } from '@utils/const.app';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
        UsersModule,
        AuthUserModule,
        ConsortiumModule,
    ],
    controllers: [BankingsController],
    providers: [BankingsService],
    exports: [BankingsService],
})
export class BankingsModule {}
