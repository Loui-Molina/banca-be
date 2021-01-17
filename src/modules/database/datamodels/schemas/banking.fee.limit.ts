import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { PlayTypes } from '@database/datamodels/enums/play.types';
import * as mongoose from 'mongoose';

// Porcentaje que se le paga a cada banca por cada jugada que vende

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class BankingFeeLimit extends Document implements DataObject {
    @Prop({
        type: String,
        enum: PlayTypes,
    })
    playType?: PlayTypes;
    @Prop({ min: 0, max: 100 }) feePercentage?: number;

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId }) creationUserId: ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;
}

export const BankingFeeLimitSchema = SchemaFactory.createForClass(BankingFeeLimit);
