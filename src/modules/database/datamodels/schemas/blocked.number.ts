import { DataObject } from '@database/datamodels/schemas/data.object';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class BlockedNumber extends Document implements DataObject {
    @Prop({ type: [Number] }) numbers?: number[];
    @Prop({ type: [Date] }) dates?: Date[];

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId }) creationUserId: ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;
}

export const BlockedNumberSchema = SchemaFactory.createForClass(BlockedNumber);
