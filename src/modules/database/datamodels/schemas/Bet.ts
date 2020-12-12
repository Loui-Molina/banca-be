import { DataObject } from './DataObject';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Play } from './Play';

export type BetDocument = Bet & Document;
@Schema()
export class Bet implements DataObject {
  @Prop({ immutable: true }) plays: Play[];
  @Prop({ immutable: true }) date: Date;

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const BetSchema = SchemaFactory.createForClass(Bet);
