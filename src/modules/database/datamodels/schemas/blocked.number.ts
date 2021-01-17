import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Document, ObjectId } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class BlockedNumber extends Document implements DataObject {
    @Prop({ required: true }) number?: number;
    @Prop() position?: number;

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string | ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string | ObjectId;
}

export const BlockedNumberSchema = SchemaFactory.createForClass(BlockedNumber);
