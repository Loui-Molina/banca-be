import { DataObject } from './DataObject';
import { PlayTypes } from '../enums/PlayTypes';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Play implements DataObject {
  playType?: PlayTypes;
  amount?: number;

  creationDate: Date;
  creationUserId: string;
  deletionDate: Date;
  modificationDate: Date;
  modificationUserId: string;
}
export const PlaySchema = SchemaFactory.createForClass(Play);
