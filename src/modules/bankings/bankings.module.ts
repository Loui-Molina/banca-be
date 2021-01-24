import { Module } from '@nestjs/common';
import { BankingsService } from '@bankings/bankings.service';
import { BankingsController } from '@bankings/bankings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@users/users.module';
import { ConsortiumModule } from '@consortiums/consortium.module';
import { AuthUserModule } from '@auth.user/auth.user.module';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], 'banca'),
        UsersModule,
        AuthUserModule,
        ConsortiumModule,
    ],
    controllers: [BankingsController],
    providers: [BankingsService],
})
export class BankingsModule {}
