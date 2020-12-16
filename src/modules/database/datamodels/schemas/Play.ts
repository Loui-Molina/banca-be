import {DataObject} from './DataObject';
import {PlayTypes} from '../enums/PlayTypes';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {PlayNumbers, PlayNumbersSchema} from './PlayNumbers';

export type PlayDocument = Play & Document;

@Schema()
export class Play implements DataObject {
  @Prop({ required: true, type: String }) playType?: PlayTypes;
  @Prop({ required: true }) amount?: number;
  @Prop({ required: true, type: PlayNumbersSchema }) playNumbers: PlayNumbers;

  // Data object members
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const PlaySchema = SchemaFactory.createForClass(Play).set(
  'timestamps',
  true,
);
