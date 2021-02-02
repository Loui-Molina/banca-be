import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardService } from '@dashboard/dashboard.service';
import { DashboardController } from '@dashboard/dashboard.controller';
import { Consortium, ConsortiumSchema } from '@database/datamodels/schemas/consortium';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';
import { ConstApp } from '@utils/const.app';
import {WebUser, WebUserSchema} from "@database/datamodels/schemas/web.user";

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
