import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataObject } from './DataObject';

@Schema()
export class PhoneNumber implements DataObject {
  prefix?: number;
  regionCode?: number;
  phoneNumber?: number;
  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}
export const PhoneNumberSchema = SchemaFactory.createForClass(PhoneNumber);
