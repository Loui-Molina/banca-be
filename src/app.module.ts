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

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        AuthModule,
        DatabaseModule,
        CoreModule,
        HealthCheckModule,
        ScheduleModule.forRoot(),
        UtilsModule,
        CommonModule, // TODO CHECK IF NEEDED TO MOVE TO MANAGER MODULE
    ],
    controllers: [],
    providers: [TasksService],
    exports: [CoreModule, UtilsModule, AuthModule, DatabaseModule],
})
export class AppModule {}
