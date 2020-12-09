import { Days } from '../enums/Days';

import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ConsortiumPreference } from './ConsortiumPreference';
import { DataObject } from './DataObject';

@Schema()
export class LotteryTime implements DataObject {
  day?: Days[];
  openTime?: string;
  closeTime?: string;

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const LotteryTimeSchema = SchemaFactory.createForClass(LotteryTime);
