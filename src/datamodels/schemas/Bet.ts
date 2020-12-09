import { DataObject } from './DataObject';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Play } from './Play';

@Schema()
export class Bet implements DataObject {
  plays?: Play[];
  date?: Date;

  // Data object members

  creationUserId: string;
  deletionDate: Date;
  modificationDate: Date;
  modificationUserId: string;
  creationDate: Date;
}

export const BetSchema = SchemaFactory.createForClass(Bet);
