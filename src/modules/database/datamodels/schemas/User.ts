import { DataObject } from '@database/datamodels/schemas/DataObject';
import { Roles } from '@database/datamodels/enums/Roles';
import { UserPreference, UserPreferenceSchema } from '@database/datamodels/schemas/UserPreference';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User implements DataObject {
  @ApiProperty() @Prop() lastLogin?: Date;
  @ApiProperty() @Prop() name?: string;
  @ApiProperty() @Prop({unique: true }) username: string;
  @ApiProperty() @Prop() password: string;
  @ApiProperty() @Prop({ type: String, enum: Roles }) role: Roles;
  @ApiProperty()
  @Prop({ type: UserPreferenceSchema })
  preferences?: UserPreference;
  @ApiProperty()
  @Prop()
  salt: string;
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

  validatePassword:Function;

}

export const UserSchema = SchemaFactory.createForClass(User)
  .set('collection', 'users')
  .set('timestamps', true);

  UserSchema.methods.validatePassword = async function validatePassword(password :string): Promise<boolean>{
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  };
