import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {DashboardService} from "@src/modules/dashboard/dashboard.service";
import {DashboardController} from "@src/modules/dashboard/dashboard.controller";
import {Consortium, ConsortiumSchema} from "@database/datamodels/schemas/Consortium";
import {Banking, BankingSchema} from "@database/datamodels/schemas/Banking";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], 'banca'),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], 'banca'),
    ],
    providers: [DashboardService],
    controllers: [DashboardController],
    exports: [DashboardService, MongooseModule],
})
export class DashboardModule {}
