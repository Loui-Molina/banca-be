import { DataObject } from '@database/datamodels/schemas/DataObject';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Play, PlaySchema } from '@database/datamodels/schemas/Play';
import { Document } from 'mongoose';

export type BetDocument = Bet & Document;
@Schema()
export class Bet implements DataObject {
  @Prop({ immutable: true, type: [PlaySchema] }) plays: Play[];
  @Prop({ immutable: true }) date: Date;

  // Data object members
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const BetSchema = SchemaFactory.createForClass(Bet).set(
  'timestamps',
  true,
);
