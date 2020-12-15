import { Days } from '../enums/Days';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataObject } from './DataObject';
import { Document } from 'mongoose';

export type LotteryTimeDocument = LotteryTime & Document;
@Schema()
export class LotteryTime implements DataObject {
  @Prop({ type: [String], enum: [Days] }) day: Days[];
  @Prop({ required: true }) openTime?: string;
  @Prop({ required: true }) closeTime?: string;

  // Data object members
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const LotteryTimeSchema = SchemaFactory.createForClass(LotteryTime).set(
  'timestamps',
  true,
);
