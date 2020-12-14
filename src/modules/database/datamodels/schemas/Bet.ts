import { DataObject } from './DataObject';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Play } from './Play';
import { Document } from 'mongoose';

export type BetDocument = Bet & Document;
@Schema()
export class Bet implements DataObject {
  @Prop({ immutable: true }) plays: Play[];
  @Prop({ immutable: true }) date: Date;

  // Data object members
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const BetSchema = SchemaFactory.createForClass(Bet);
