import { DataObject } from './DataObject';
import { PlayTypes } from '../enums/PlayTypes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PlayDocument = Play & Document;
@Schema()
export class Play  implements DataObject {
  @Prop({ required: true, type: PlayTypes }) playType?: PlayTypes;
  @Prop({ required: true }) amount?: number;

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}
export const PlaySchema = SchemaFactory.createForClass(Play);
