import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class Movement extends Document implements DataObject {
    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId }) creationUserId: ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;
}
export const MovementSchema = SchemaFactory.createForClass(Movement);
