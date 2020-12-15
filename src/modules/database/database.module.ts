import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './services/database.service';
import { Consortium, ConsortiumSchema } from './datamodels/schemas/Consortium';
import { Lottery, LotterySchema } from './datamodels/schemas/Lottery';
import { Banking, BankingSchema } from './datamodels/schemas/Banking';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Consortium.name, schema: ConsortiumSchema },
      { name: Banking.name, schema: BankingSchema },
    ]),
  ],
  providers: [DatabaseService, Consortium, Banking],
})
export class DatabaseModule {}
