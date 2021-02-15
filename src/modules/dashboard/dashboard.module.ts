import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Banking, BankingSchema } from '../database/datamodels/schemas/banking';
import { Consortium, ConsortiumSchema } from '../database/datamodels/schemas/consortium';
import { WebUser, WebUserSchema } from '../database/datamodels/schemas/web.user';
import { ConstApp } from '../utils/const.app';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: WebUser.name, schema: WebUserSchema }], ConstApp.BANKING),
    ],
    providers: [DashboardService],
    controllers: [DashboardController],
    exports: [DashboardService, MongooseModule],
})
export class DashboardModule {}
