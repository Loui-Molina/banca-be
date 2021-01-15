import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { UserPreference, UserPreferenceSchema } from '@src/modules/database/datamodels/schemas/user.preference';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Role } from '@database/datamodels/enums/role';

export type UserDocument = User & Document;

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class User implements DataObject {
    @ApiProperty() _id?: ObjectId;
    @ApiProperty() @Prop() lastLogin?: Date;
    @ApiProperty() @Prop() name?: string;
    @ApiProperty() @Prop({ unique: true, required:true }) username: string;
    @ApiProperty() @Prop({ required: true, select:false }) password: string;
    @ApiProperty({ type: String, enum: Role }) @Prop({ type: String, enum: Role }) role: Role;
    @ApiProperty()
    @Prop({ type: UserPreferenceSchema })
    preferences?: UserPreference;
    @ApiProperty()
    @Prop({select:false , required:true})
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

    // eslint-disable-next-line @typescript-eslint/ban-types
    validatePassword: Function;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.validatePassword = async function validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, (this as UserDocument).salt);
    return hash === (this as UserDocument).password;
};
