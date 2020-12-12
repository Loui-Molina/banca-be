import { DataObject } from './DataObject';
import { DominicanLotteryPrizes } from '../enums/DominicanLotteryPrizes';
import { UsLotteryPrizes } from '../enums/UsLotteryPrizes';
import { BrasilPrizes } from '../enums/BrasilPrizes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// cantidad de veces que se puede hacer una jugada

export type PlayLimitDocument = PlayLimit & Document;
@Schema()
export class PlayLimit  implements DataObject {
  @Prop({ required: true }) limit?: number;
  @Prop({
    type: String,
    enum: [DominicanLotteryPrizes, UsLotteryPrizes, BrasilPrizes],
  })
  playType?: DominicanLotteryPrizes | UsLotteryPrizes | BrasilPrizes;
  @Prop() appliedBankingsIds?: string[];

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const PlayLimitSchema = SchemaFactory.createForClass(PlayLimit);
