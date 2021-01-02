import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from '@database/database.service';
import { Supervisor, SupervisorSchema } from '@src/modules/database/datamodels/schemas/supervisor';
import { ConsortiumPreference, ConsortiumPreferenceSchema } from '@src/modules/database/datamodels/schemas/consortium.preference';
import { Banking, BankingSchema } from '@src/modules/database/datamodels/schemas/banking';
import { Lottery, LotterySchema } from '@src/modules/database/datamodels/schemas/lottery';
import { Transaction, TransactionSchema } from '@src/modules/database/datamodels/schemas/transaction';

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
