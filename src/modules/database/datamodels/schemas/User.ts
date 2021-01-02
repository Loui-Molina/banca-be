import { DataObject } from '@database/datamodels/schemas/DataObject';
import { UserPreference, UserPreferenceSchema } from '@database/datamodels/schemas/UserPreference';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Role } from '@database/datamodels/enums/role';

export type UserDocument = User & Document;

@Schema()
export class User implements DataObject {
    @ApiProperty() _id?: ObjectId;
    @ApiProperty() @Prop() lastLogin?: Date;
    @ApiProperty() @Prop() name?: string;
    @ApiProperty() @Prop({ unique: true }) username: string;
    @ApiProperty() @Prop({ required: true }) password: string;
    @ApiProperty({ type: String, enum: Role }) @Prop({ type: String, enum: Role }) role: Role;
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

    validatePassword: Function;
}

export const UserSchema = SchemaFactory.createForClass(User).set('collection', 'users').set('timestamps', true);

UserSchema.methods.validatePassword = async function validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
};
