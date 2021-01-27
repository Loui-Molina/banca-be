import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataObject } from '@database/datamodels/schemas/data.object';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class PhoneNumber extends Document implements DataObject {
    @Prop() prefix?: number;
    @Prop() regionCode?: number;
    @Prop({ required: true }) phoneNumber?: number;

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId }) creationUserId: ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;
}

export const PhoneNumberSchema = SchemaFactory.createForClass(PhoneNumber);
