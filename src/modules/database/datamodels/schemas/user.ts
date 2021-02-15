import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Role } from '../enums/role';
import { DataObject } from './data.object';
import { UserPreferenceSchema, UserPreference } from './user.preference';


@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class User extends Document implements DataObject {
    @ApiProperty() _id?: ObjectId;
    @ApiProperty() @Prop() lastLogin?: Date;
    @ApiProperty() @Prop() name?: string;
    @ApiProperty() @Prop({ unique: true, required: true }) username: string;
    @ApiProperty() @Prop({ required: true, select: false }) password: string;
    @ApiProperty({ type: String, enum: Role }) @Prop({ type: String, enum: Role }) role: Role;
    @ApiProperty()
    @Prop({ type: UserPreferenceSchema })
    preferences?: UserPreference;
    @ApiProperty()
    @Prop({ select: false, required: true })
    salt: string;
    /** Data object members*/
    @ApiProperty()
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    creationUserId: ObjectId;
    @ApiProperty()
    @Prop({ required: false, type: [String] })
    oldPasswords: string[];
    @ApiProperty()
    @Prop()
    deletionDate?: Date;
    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    modificationUserId: ObjectId;

    // eslint-disable-next-line @typescript-eslint/ban-types
    validatePassword: Function;

    // eslint-disable-next-line @typescript-eslint/ban-types
    validateOldPassword: Function;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.validatePassword = async function validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
};

UserSchema.methods.validateOldPassword = async function validateOldPassword(password: string): Promise<boolean> {
    let used = false;
    for (let index = 0; index < this.oldPasswords.length; index++) {
        const oldPassword = this.oldPasswords[index];
        const hash = await bcrypt.hash(password, this.salt);
        if (hash === oldPassword) {
            return (used = true);
        }
        used = false;
    }
    return used;
};
