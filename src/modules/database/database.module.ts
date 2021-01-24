import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConstApp } from '@utils/const.app';

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            connectionName: ConstApp.BANKING,
            useFactory: async (config: ConfigService) => ({
                uri: config.get('bancaDB'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            connectionName: ConstApp.USER,
            useFactory: async (config: ConfigService) => ({
                uri: config.get('userDB'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
