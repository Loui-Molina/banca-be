import { DataObject } from './DataObject';
import { DominicanLotteryPrizes } from '../enums/DominicanLotteryPrizes';
import { UsLotteryPrizes } from '../enums/UsLotteryPrizes';
import { BrasilPrizes } from '../enums/BrasilPrizes';

// Monto a pagar por cada unidad monetaria al momento de haber un ganador
import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PrizeLimit implements DataObject {
  playType?: DominicanLotteryPrizes | UsLotteryPrizes | BrasilPrizes;
  paymentAmount?: number;

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}
export const PrizeLimitSchema = SchemaFactory.createForClass(PrizeLimit);
