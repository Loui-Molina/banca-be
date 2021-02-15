import { Module } from '@nestjs/common';
import { HealthCheckModule } from './modules/health-check/health.check.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from './modules/utils/utils.module';
import { CoreModule } from './modules/manager/core.module';
import { DatabaseModule } from './modules/database/database.module';
import { CommonModule } from './modules//common/common.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './modules/services/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConstApp } from './modules/utils/const.app';
import { PlayPool, PlayPoolSchema } from './modules/database/datamodels/schemas/playPool';

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
