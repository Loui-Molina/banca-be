import { DataObject } from '@database/datamodels/schemas/DataObject';
import { DominicanLotteryPrizes } from '@database/datamodels/enums/DominicanLotteryPrizes';
import { UsLotteryPrizes } from '@database/datamodels/enums/UsLotteryPrizes';
import { BrasilPrizes } from '@database/datamodels/enums/BrasilPrizes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// cantidad de veces que se puede hacer una jugada

export type PlayLimitDocument = PlayLimit & Document;
@Schema()
export class PlayLimit implements DataObject {
  @Prop({ required: true }) limit?: number;
  @Prop({
    type: String,
    enum: [DominicanLotteryPrizes, UsLotteryPrizes, BrasilPrizes],
  })
  playType?: DominicanLotteryPrizes | UsLotteryPrizes | BrasilPrizes;
  @Prop() appliedBankingsIds?: string[];

  // Data object members
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const PlayLimitSchema = SchemaFactory.createForClass(PlayLimit).set('timestamps', true);
