// Main data object model
import { DataObject } from './DataObject';
import { User } from './User';
import { Consortium } from './Consortium';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Data implements DataObject {
  @Prop([Consortium]) consortium?: Consortium;
  @Prop([User]) users?: User[];

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const DataSchema = SchemaFactory.createForClass(Data);
