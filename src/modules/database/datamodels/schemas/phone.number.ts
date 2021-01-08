import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Document } from 'mongoose';

export type PhoneNumberDocument = PhoneNumber & Document;
@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class PhoneNumber implements DataObject {
    @Prop() prefix?: number;
    @Prop() regionCode?: number;
    @Prop({ required: true }) phoneNumber?: number;

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string;
}

export const PhoneNumberSchema = SchemaFactory.createForClass(PhoneNumber);
