import { DataObject } from '@database/datamodels/schemas/DataObject';
import { DominicanLotteryPrizes } from '@database/datamodels/enums/DominicanLotteryPrizes';
import { UsLotteryPrizes } from '@database/datamodels/enums/UsLotteryPrizes';
import { BrasilPrizes } from '@database/datamodels/enums/BrasilPrizes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Porcentaje que se le paga a cada banca por cada jugada que vende
export type BankingFeeLimitDocument = BankingFeeLimit & Document;

@Schema()
export class BankingFeeLimit implements DataObject {
  @Prop({
    type: String,
    enum: [DominicanLotteryPrizes, UsLotteryPrizes, BrasilPrizes],
  })
  playType?: DominicanLotteryPrizes | UsLotteryPrizes | BrasilPrizes;
  @Prop({ min: 0, max: 100 }) feePercentage?: number;

  // Data object members
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const BankingFeeLimitSchema = SchemaFactory.createForClass(
  BankingFeeLimit,
).set('timestamps', true);
