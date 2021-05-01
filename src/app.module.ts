import { Module } from '@nestjs/common';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from '@utils/utils.module';
import { CoreModule } from '@manager/core.module';
import { DatabaseModule } from '@database/database.module';
import { CommonModule } from '@common.module/common.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from '@src/modules/services/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConstApp } from '@utils/const.app';
import { PlayPool, PlayPoolSchema } from '@database/datamodels/schemas/playPool';
import { LoggerModule } from '@common/logger/logger.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
          }),
        LoggerModule,
        DatabaseModule,
        AuthModule,
        CoreModule,
        ScheduleModule.forRoot(),
        UtilsModule,
        CommonModule, // TODO CHECK IF NEEDED TO MOVE TO MANAGER MODULE
        MongooseModule.forFeature([{ name: PlayPool.name, schema: PlayPoolSchema }], ConstApp.BANKING), // FOR tasks service
    ],
    controllers: [],
    providers: [{
        provide: APP_GUARD,
        useClass: ThrottlerGuard
      }
      ,TasksService],
    exports: [CoreModule, UtilsModule, AuthModule, DatabaseModule],
})
export class AppModule {}
