import { DataObject } from './DataObject';
import { DominicanLotteryPrizes } from '../enums/DominicanLotteryPrizes';
import { UsLotteryPrizes } from '../enums/UsLotteryPrizes';
import { BrasilPrizes } from '../enums/BrasilPrizes';
import { OCStatus } from '../enums/OCStatus';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Estado y limite de apuesta en cada jugada

@Schema()
export class BettingLimit implements DataObject {
  @Prop({
    type: String,
    enum: [DominicanLotteryPrizes, UsLotteryPrizes, BrasilPrizes],
  })
  playType: DominicanLotteryPrizes | UsLotteryPrizes | BrasilPrizes;
  @Prop({ required: true }) status: OCStatus;
  @Prop({ required: true }) betAmount?: number;

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const BettingLimitSchema = SchemaFactory.createForClass(BettingLimit);
