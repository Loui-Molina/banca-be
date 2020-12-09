// Main data object model
import { DataObject } from './DataObject';
import { User } from './User';
import { Consortium } from './Consortium';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ConsortiumPreference } from './ConsortiumPreference';

@Schema()
export class Data implements DataObject {
  lastChange?: Date;
  lastBackup?: Date;
  consortium?: Consortium;
  users?: Map<string, User>;

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const DataSchema = SchemaFactory.createForClass(Data);
