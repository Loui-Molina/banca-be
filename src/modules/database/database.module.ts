import {Global, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {DatabaseService} from './services/database.service';
import {Supervisor, SupervisorSchema} from "./datamodels/schemas/Supervisor";
import {
    ConsortiumPreference,
    ConsortiumPreferenceSchema
} from "./datamodels/schemas/ConsortiumPreference";
import {Banking, BankingSchema} from "./datamodels/schemas/Banking";
import {Lottery, LotterySchema} from "./datamodels/schemas/Lottery";
import {Transaction, TransactionSchema} from "./datamodels/schemas/Transaction";
import {User, UserSchema} from "./datamodels/schemas/User";

const providersExports = [DatabaseService,
    Supervisor,
    ConsortiumPreference,
    Banking,
    Lottery,
    Transaction,
    User];

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Supervisor.name, schema: SupervisorSchema},
            {name: ConsortiumPreference.name, schema: ConsortiumPreferenceSchema},
            {name: Banking.name, schema: BankingSchema},
            {name: Lottery.name, schema: LotterySchema},
            {name: Transaction.name, schema: TransactionSchema},
            {name: User.name, schema: UserSchema},
        ]),
    ],
    providers: providersExports,
    exports: providersExports
})
export class DatabaseModule {
}
