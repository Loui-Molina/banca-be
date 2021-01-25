import { Module } from '@nestjs/common';
import { HealthCheckModule } from '@src/modules/health-check/health.check.module';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from '@utils/utils.module';
import { ManagerModule } from '@src/modules/manager/manager.module';
import { AuthUserModule } from '@src/modules/auth.user/auth.user.module';
import { DatabaseModule } from '@database/database.module';
import { CommonModule } from '@common.module/common.module';

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
        CommonModule, // TODO CHECK IF NEEDED TO MOVE TO MANAGER MODULE
    ],
    controllers: [],
    providers: [],
    exports: [UsersModule, UtilsModule, AuthModule, AuthUserModule],
})
export class AppModule {}
