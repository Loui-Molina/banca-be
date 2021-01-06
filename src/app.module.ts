import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthCheckModule } from '@src/modules/health-check/health.check.module';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UtilsModule } from '@utils/utils.module';
import { ManagerModule } from './modules/manager/manager.module';
import { AuthUserModule } from './modules/auth.user/auth.user.module';
import { ConsortiumModule } from '@src/modules/consortiums/consortium.module';
import {DashboardModule} from "@src/modules/dashboard/dashboard.module";
import {TransactionModule} from "@src/modules/transactions/transaction.module";
import {ResultsModule} from "@src/modules/results/results.module";
import {DatabaseModule} from "@database/database.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            connectionName: 'banca',
            useFactory: async (config: ConfigService) => ({
                uri: config.get('bancaDB'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            connectionName: 'user',
            useFactory: async (config: ConfigService) => ({
                uri: config.get('userDB'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            inject: [ConfigService],
        }),
        ManagerModule,
        HealthCheckModule,
        DatabaseModule,
        AuthModule,
        AuthUserModule,
        UsersModule,
        UtilsModule,
    ],
    controllers: [],
    providers: [],
    exports: [
        UsersModule,
        UtilsModule,
        AuthModule,
        AuthUserModule,
    ],
})
export class AppModule {}
