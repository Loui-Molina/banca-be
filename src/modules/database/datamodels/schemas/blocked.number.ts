import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Document, ObjectId } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class BlockedNumber extends Document implements DataObject {
    @Prop({ required: true }) number?: number;
    @Prop() position?: number;

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId }) creationUserId: ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;
}

export const BlockedNumberSchema = SchemaFactory.createForClass(BlockedNumber);
