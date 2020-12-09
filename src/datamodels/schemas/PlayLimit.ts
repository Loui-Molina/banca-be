import { DataObject } from './DataObject';
import { DominicanLotteryPrizes } from '../enums/DominicanLotteryPrizes';
import { UsLotteryPrizes } from '../enums/UsLotteryPrizes';
import { BrasilPrizes } from '../enums/BrasilPrizes';

// cantidad de veces que se puede hacer una jugada
import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PlayLimit implements DataObject {
  limit?: number;
  playType?: DominicanLotteryPrizes | UsLotteryPrizes | BrasilPrizes;
  appliedBankingsIds?: string[];

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}
export const PlayLimitSchema = SchemaFactory.createForClass(PlayLimit);
