import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from '@database/database.service';
import { Supervisor, SupervisorSchema } from '@database/datamodels/schemas/Supervisor';
import {
  ConsortiumPreference,
  ConsortiumPreferenceSchema,
} from '@database/datamodels/schemas/ConsortiumPreference';
import { Banking, BankingSchema } from '@database/datamodels/schemas/Banking';
import { Lottery, LotterySchema } from '@database/datamodels/schemas/Lottery';
import {
  Transaction,
  TransactionSchema,
} from '@database/datamodels/schemas/Transaction';
import { User, UserSchema } from '@database/datamodels/schemas/User';

const providersExports = [
  DatabaseService,
  Supervisor,
  ConsortiumPreference,
  Banking,
  Lottery,
  Transaction,
  User,
];

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Supervisor.name, schema: SupervisorSchema },
      { name: ConsortiumPreference.name, schema: ConsortiumPreferenceSchema },
      { name: Banking.name, schema: BankingSchema },
      { name: Lottery.name, schema: LotterySchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: providersExports,
  exports: providersExports,
})
export class DatabaseModule {}
