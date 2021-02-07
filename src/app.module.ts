import { Module } from '@nestjs/common';
import { HealthCheckModule } from '@health-check/health.check.module';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from '@utils/utils.module';
import { CoreModule } from '@manager/core.module';
import { DatabaseModule } from '@database/database.module';
import { CommonModule } from '@common.module/common.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from '@src/modules/services/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';
import { ConstApp } from '@utils/const.app';
import { PlayPool, PlayPoolSchema } from '@database/datamodels/schemas/playPool';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        DatabaseModule,
        AuthModule,
        CoreModule,
        HealthCheckModule,
        ScheduleModule.forRoot(),
        UtilsModule,
        CommonModule, // TODO CHECK IF NEEDED TO MOVE TO MANAGER MODULE
        MongooseModule.forFeature([{ name: PlayPool.name, schema: PlayPoolSchema }], ConstApp.BANKING), // FOR tasks service
    ],
    controllers: [],
    providers: [TasksService],
    exports: [CoreModule, UtilsModule, AuthModule, DatabaseModule],
})
export class AppModule {}
