import { DataObject } from './DataObject';
import { Roles } from '../enums/Roles';
import { UserPreference } from './UserPreference';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class User implements DataObject {
  @Prop() lastLogin?: Date;
  @Prop() name?: string;
  @Prop() username: string;
  @Prop() password: string;
  @Prop() role: Roles;
  @Prop() preferences?: UserPreference;

  // Data object members
  @Prop({ required: true }) creationDate: Date;
  @Prop({ required: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
