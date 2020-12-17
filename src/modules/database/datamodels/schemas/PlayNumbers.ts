// Los numeros que salieron en la loteria
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataObject } from './DataObject';
import { Document } from 'mongoose';

export type PlayNumbersDocument = PlayNumbers & Document;

@Schema()
export class PlayNumbers implements DataObject {
  @Prop({ min: 0, max: 99 }) first?: number;
  @Prop({ min: 0, max: 99 }) second?: number;
  @Prop({ min: 0, max: 99 }) third?: number;
  @Prop({ min: 0, max: 99 }) fourth?: number;
  @Prop({ min: 0, max: 99 }) fifth?: number;
  @Prop({ min: 0, max: 99 }) sixth?: number;
  @Prop({ min: 0, max: 99 }) seventh?: number;

  // Data object members
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const PlayNumbersSchema = SchemaFactory.createForClass(PlayNumbers).set(
  'timestamps',
  true,
);
