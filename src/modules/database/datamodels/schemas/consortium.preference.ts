import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { PlayLimit, PlayLimitSchema } from '@src/modules/database/datamodels/schemas/play.limit';
import { BlockedNumber, BlockedNumberSchema } from '@src/modules/database/datamodels/schemas/blocked.number';
import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

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
