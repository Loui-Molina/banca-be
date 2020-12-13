import {DataObject} from './DataObject';
import {DominicanLotteryPrizes} from '../enums/DominicanLotteryPrizes';
import {UsLotteryPrizes} from '../enums/UsLotteryPrizes';
import {BrasilPrizes} from '../enums/BrasilPrizes';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

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
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const BankingFeeSchema = SchemaFactory.createForClass(BankingFeeLimit);
