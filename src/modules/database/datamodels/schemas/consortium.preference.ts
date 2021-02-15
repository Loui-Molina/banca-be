import { DataObject } from '@database/datamodels/schemas/data.object';
import { PlayLimit, PlayLimitSchema } from '@database/datamodels/schemas/play.limit';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class ConsortiumPreference extends Document implements DataObject {
    @Prop({ type: [PlayLimitSchema] }) limits?: PlayLimit[];

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId }) creationUserId: ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;
}

export const ConsortiumPreferenceSchema = SchemaFactory.createForClass(ConsortiumPreference);
