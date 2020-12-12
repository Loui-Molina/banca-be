import { DataObject } from './DataObject';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Languages } from '../enums/Languages';

export type UserPreferenceDocument = UserPreference & Document;
@Schema()
export class UserPreference  implements DataObject {
  @Prop({
    type: String,
    enum: Languages,
    default: Languages.spanish,
  })
  language?: Languages;

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const UserPreferenceSchema = SchemaFactory.createForClass(
  UserPreference,
);
