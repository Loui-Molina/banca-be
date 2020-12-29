import { DataObject } from '@database/datamodels/schemas/DataObject';
import { DominicanLotteryPrizes } from '@database/datamodels/enums/DominicanLotteryPrizes';
import { UsLotteryPrizes } from '@database/datamodels/enums/UsLotteryPrizes';
import { BrasilPrizes } from '@database/datamodels/enums/BrasilPrizes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PrizeLimitDocument = PrizeLimit & Document;

@Schema()
// Monto a pagar por cada unidad monetaria al momento de haber un ganador
export class PrizeLimit implements DataObject {
  @Prop({
    type: String,
    enum: [DominicanLotteryPrizes, UsLotteryPrizes, BrasilPrizes],
  })
  playType?: DominicanLotteryPrizes | UsLotteryPrizes | BrasilPrizes;
  @Prop({ required: true }) paymentAmount?: number;

  // Data object members
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const PrizeLimitSchema = SchemaFactory.createForClass(PrizeLimit).set('timestamps', true);
