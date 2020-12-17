import { DataObject } from './DataObject';
import { Roles } from '../enums/Roles';
import { UserPreference, UserPreferenceSchema } from './UserPreference';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Expose} from "class-transformer";

export type UserDocument = User & Document;

@Schema()
export class User implements DataObject {
  @Expose()
  @Prop() lastLogin?: Date;
  @Expose()
  @Prop() name?: string;
  @Expose()
  @Prop() username: string;
  @Expose()
  @Prop() password: string;
  @Prop({ type: String, enum: Roles }) role: Roles;
  @Prop({ type: UserPreferenceSchema }) preferences?: UserPreference;

  // Data object members
  @Prop({ required: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
  .set('collection', 'users')
  .set('timestamps', true);
