import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BlockedNumberDocument = BlockedNumber & Document;
@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class BlockedNumber implements DataObject {
    @Prop({ required: true }) number?: number;
    @Prop() position?: number;

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string;
}

export const BlockedNumberSchema = SchemaFactory.createForClass(BlockedNumber);
