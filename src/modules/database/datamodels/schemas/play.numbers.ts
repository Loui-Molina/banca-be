// Los numeros que salieron en la loteria
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataObject } from '@database/datamodels/schemas/data.object';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class PlayNumbers extends Document implements DataObject {
    @ApiProperty({ type: Number, required: false }) @Prop({ min: 0, max: 99 }) first?: number;
    @ApiProperty({ type: Number, required: false }) @Prop({ min: 0, max: 99 }) second?: number;
    @ApiProperty({ type: Number, required: false }) @Prop({ min: 0, max: 99 }) third?: number;
    @ApiProperty({ type: Number, required: false }) @Prop({ min: 0, max: 99 }) fourth?: number;
    @ApiProperty({ type: Number, required: false }) @Prop({ min: 0, max: 99 }) fifth?: number;
    @ApiProperty({ type: Number, required: false }) @Prop({ min: 0, max: 99 }) sixth?: number;
    @ApiProperty({ type: Number, required: false }) @Prop({ min: 0, max: 99 }) seventh?: number;

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId }) creationUserId: ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;
}

export const PlayNumbersSchema = SchemaFactory.createForClass(PlayNumbers);
