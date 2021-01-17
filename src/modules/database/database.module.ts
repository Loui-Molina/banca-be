import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from '@database/database.service';
import {
    ConsortiumPreference,
    ConsortiumPreferenceSchema,
} from '@src/modules/database/datamodels/schemas/consortium.preference';
import { Supervisor, SupervisorSchema } from '@src/modules/database/datamodels/schemas/supervisor';
import { Transaction, TransactionSchema } from '@src/modules/database/datamodels/schemas/transaction';
import { Lottery, LotterySchema } from '@src/modules/database/datamodels/schemas/lottery';
import { Banking, BankingSchema } from '@src/modules/database/datamodels/schemas/banking';
import { Event, EventSchema  } from '@database/datamodels/schemas/event';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConstApp } from '../utils/const.app';

const providersExports = [DatabaseService, Supervisor, ConsortiumPreference, Banking, Lottery, Transaction];

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            connectionName: ConstApp.BANCA,
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
        MongooseModule.forFeature(
            [
                { name: Supervisor.name, schema: SupervisorSchema },
                { name: ConsortiumPreference.name, schema: ConsortiumPreferenceSchema },
                { name: Banking.name, schema: BankingSchema },
                { name: Lottery.name, schema: LotterySchema },
                { name: Transaction.name, schema: TransactionSchema },
                { name: Event.name, schema: EventSchema},
            ],
            'banca',
        ),
    ],
    providers: providersExports,
    exports: providersExports,
})
export class DatabaseModule {}
