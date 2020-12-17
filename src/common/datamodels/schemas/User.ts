import { DataObject } from './DataObject';
import { Roles } from '../enums/Roles';
import { UserPreference, UserPreferenceSchema } from './UserPreference';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User implements DataObject {
  @ApiProperty() @Prop() lastLogin?: Date;
  @ApiProperty() @Prop() name?: string;
  @ApiProperty() @Prop() username: string;
  @ApiProperty() @Prop() password: string;
  @ApiProperty() @Prop({ type: String, enum: Roles }) role: Roles;
  @ApiProperty()
  @Prop({ type: UserPreferenceSchema })
  preferences?: UserPreference;

  // Data object members
  @ApiProperty()
  @Prop({ required: true })
  creationUserId: string;
  @ApiProperty()
  @Prop()
  deletionDate?: Date;
  @ApiProperty()
  @Prop({ required: true })
  modificationUserId: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
  .set('collection', 'users')
  .set('timestamps', true);
