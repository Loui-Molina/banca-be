import { DataObject } from './DataObject';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Languages } from '../enums/Languages';
import { Document } from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

export type UserPreferenceDocument = UserPreference & Document;

@Schema()
export class UserPreference implements DataObject {
  @ApiProperty()
  @Prop({
    type: String,
    enum: Languages,
    default: Languages.spanish,
  })
  language?: Languages;

  // Data object members
  @ApiProperty()
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @ApiProperty()
  @Prop() deletionDate?: Date;
  @ApiProperty()
  @Prop({ required: true }) modificationUserId: string;
}

export const UserPreferenceSchema = SchemaFactory.createForClass(
  UserPreference,
).set('timestamps', true);
