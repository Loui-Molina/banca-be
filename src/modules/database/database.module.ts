import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from '@database/database.service';
import { ConsortiumPreference, ConsortiumPreferenceSchema } from '@src/modules/database/datamodels/schemas/consortium.preference';
import {Supervisor, SupervisorSchema} from "@database/datamodels/schemas/Supervisor";
import {Transaction, TransactionSchema} from "@database/datamodels/schemas/Transaction";
import {Lottery, LotterySchema} from "@database/datamodels/schemas/Lottery";
import {Banking, BankingSchema} from "@database/datamodels/schemas/Banking";

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
