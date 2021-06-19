import { DataObject } from '@database/datamodels/schemas/data.object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";
import {PlayTypes} from "@database/datamodels/enums/play.types";

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class BankingPercentage extends Document implements DataObject {

    @ApiProperty({ type: String, enum: PlayTypes }) @Prop({ required: true, type: String }) playType?: PlayTypes;
    @ApiProperty({ type: Number }) @Prop() amount?: number;

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId }) creationUserId: ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;
}

export const BankingPercentageSchema = SchemaFactory.createForClass(BankingPercentage);
