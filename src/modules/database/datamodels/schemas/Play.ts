import { DataObject } from './DataObject';
import { PlayTypes } from '../enums/PlayTypes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayDocument = Play & Document;

@Schema()
export class Play implements DataObject {
  @Prop({ required: true, type: String }) playType?: PlayTypes;
  @Prop({ required: true }) amount?: number;

  // Data object members
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const PlaySchema = SchemaFactory.createForClass(Play).set(
  'timestamps',
  true,
);
