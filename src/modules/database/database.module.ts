import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BankingData,
  BankingDataSchema,
} from './datamodels/schemas/BankingData';
import { DatabaseService } from './services/database.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BankingData.name, schema: BankingDataSchema },
    ]),
  ],
  providers: [DatabaseService, BankingData],
})
export class DatabaseModule {}
