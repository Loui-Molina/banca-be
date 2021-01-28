import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { PlayTypes } from '@database/datamodels/enums/play.types';
import { ApiProperty } from '@nestjs/swagger';

// Estado y limite de apuesta en cada jugada

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class BettingLimit extends Document implements DataObject {
    @ApiProperty({
        required: true,
        type: String,
        enum: PlayTypes,
    })
    @Prop({
        type: String,
        enum: PlayTypes,
    })
    playType: PlayTypes;
    @ApiProperty({ required: true }) @Prop() status: boolean;
    @ApiProperty({ required: false }) @Prop({ required: true }) betAmount?: number;

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId }) creationUserId: ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;
}

export const BettingLimitSchema = SchemaFactory.createForClass(BettingLimit);
