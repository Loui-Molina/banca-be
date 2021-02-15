import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BlockedNumberSchema, BlockedNumber } from './blocked.number';
import { DataObject } from './data.object';
import { PlayLimitSchema, PlayLimit } from './play.limit';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class ConsortiumPreference extends Document implements DataObject {
    @Prop({ type: [PlayLimitSchema] }) limits?: PlayLimit[];
    @Prop({ type: [BlockedNumberSchema] }) blockedNumbers?: BlockedNumber[];

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId }) creationUserId: ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;
}

export const ConsortiumPreferenceSchema = SchemaFactory.createForClass(ConsortiumPreference);
