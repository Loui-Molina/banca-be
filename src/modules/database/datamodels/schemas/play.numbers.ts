// Los numeros que salieron en la loteria
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
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

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string | ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string | ObjectId;
}

export const PlayNumbersSchema = SchemaFactory.createForClass(PlayNumbers);
