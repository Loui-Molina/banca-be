import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from '@database/database.service';
import { ConsortiumPreference, ConsortiumPreferenceSchema } from '@src/modules/database/datamodels/schemas/consortium.preference';
import {Supervisor, SupervisorSchema} from "@src/modules/database/datamodels/schemas/s1upervisor";
import {Transaction, TransactionSchema} from "@src/modules/database/datamodels/schemas/t1ransaction";
import {Lottery, LotterySchema} from "@src/modules/database/datamodels/schemas/l1ottery";
import {Banking, BankingSchema} from "@src/modules/database/datamodels/schemas/b1anking";

const providersExports = [DatabaseService, Supervisor, ConsortiumPreference, Banking, Lottery, Transaction];

@Global()
@Module({
    imports: [
        MongooseModule.forFeature(
            [
                { name: Supervisor.name, schema: SupervisorSchema },
                { name: ConsortiumPreference.name, schema: ConsortiumPreferenceSchema },
                { name: Banking.name, schema: BankingSchema },
                { name: Lottery.name, schema: LotterySchema },
                { name: Transaction.name, schema: TransactionSchema },
            ],
            'banca',
        ),
    ],
    providers: providersExports,
    exports: providersExports,
})
export class DatabaseModule {}
