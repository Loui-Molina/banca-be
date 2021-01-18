import { Global, Module } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { ConsortiumPreference } from '@src/modules/database/datamodels/schemas/consortium.preference';
import { Supervisor } from '@src/modules/database/datamodels/schemas/supervisor';
import { Transaction } from '@src/modules/database/datamodels/schemas/transaction';
import { Lottery } from '@src/modules/database/datamodels/schemas/lottery';
import { Banking } from '@src/modules/database/datamodels/schemas/banking';

const providersExports = [DatabaseService, Supervisor, ConsortiumPreference, Banking, Lottery, Transaction];

@Global()
@Module({
    /*    imports: [
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
    exports: providersExports,*/
})
export class DatabaseModule {}
