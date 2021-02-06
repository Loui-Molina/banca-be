import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { PlayTypes } from '@database/datamodels/enums/play.types';
import { PlayNumbers, PlayNumbersSchema } from '@database/datamodels/schemas/play.numbers';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class PlayPool extends Document {
    @ApiProperty() _id?: ObjectId;
    @ApiProperty({ type: String, enum: PlayTypes }) @Prop({ required: true, type: String }) playType?: PlayTypes;
    @ApiProperty({ type: PlayNumbers })
    @Prop({ required: true, type: PlayNumbersSchema })
    playNumbers: PlayNumbers;
    @ApiProperty() @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId }) lotteryId?: ObjectId;
    @ApiProperty({ type: Number }) @Prop({ required: true }) amount?: number;
    @ApiProperty({ type: Date }) @Prop({ immutable: true }) date: Date;
}

export const PlayPoolSchema = SchemaFactory.createForClass(PlayPool);
