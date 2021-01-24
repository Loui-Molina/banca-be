import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthCheckModule } from '@src/modules/health-check/health.check.module';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UtilsModule } from '@utils/utils.module';
import { ManagerModule } from '@src/modules/manager/manager.module';
import { AuthUserModule } from '@src/modules/auth.user/auth.user.module';
import { DatabaseModule } from '@database/database.module';
import { CommonModule } from './modules/common/common.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        DatabaseModule,
        ManagerModule,
        UsersModule,
        HealthCheckModule,
        AuthModule,
        AuthUserModule,
        UtilsModule,
        CommonModule,
    ],
    controllers: [],
    providers: [],
    exports: [UsersModule, UtilsModule, AuthModule, AuthUserModule],
})
export class AppModule {}
