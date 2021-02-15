import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUserModule } from '../auth.user/auth.user.module';
import { Banking, BankingSchema } from '../database/datamodels/schemas/banking';
import { Consortium, ConsortiumSchema } from '../database/datamodels/schemas/consortium';
import { ConstApp } from '../utils/const.app';
import { ConsortiumController } from './consortium.controller';
import { ConsortiumService } from './consortium.service';

@Module({
    imports: [
        AuthUserModule,
        MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
    ],
    providers: [ConsortiumService],
    controllers: [ConsortiumController],
    exports: [ConsortiumService],
})
export class ConsortiumModule {}
