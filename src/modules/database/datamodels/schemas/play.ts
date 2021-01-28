import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { PlayTypes } from '@src/modules/database/datamodels/enums/play.types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { PlayNumbers, PlayNumbersSchema } from '@src/modules/database/datamodels/schemas/play.numbers';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class Play extends Document implements DataObject {
    @ApiProperty({ type: String, enum: PlayTypes }) @Prop({ required: true, type: String }) playType?: PlayTypes;
    @ApiProperty({ type: Number }) @Prop({ required: true }) amount?: number;
    @ApiProperty({ type: PlayNumbers })
    @Prop({ required: true, type: PlayNumbersSchema })
    playNumbers: PlayNumbers;
    @ApiProperty() @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId }) lotteryId?: ObjectId;

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId }) creationUserId: ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;
}

export const PlaySchema = SchemaFactory.createForClass(Play);
