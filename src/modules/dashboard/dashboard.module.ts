import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardService } from '@src/modules/dashboard/dashboard.service';
import { DashboardController } from '@src/modules/dashboard/dashboard.controller';
import { Consortium, ConsortiumSchema } from '@src/modules/database/datamodels/schemas/consortium';
import { Banking, BankingSchema } from '@src/modules/database/datamodels/schemas/banking';

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
