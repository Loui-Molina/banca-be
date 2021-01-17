import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { PlayTypes } from '@src/modules/database/datamodels/enums/play.types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { PlayNumbers, PlayNumbersSchema } from '@src/modules/database/datamodels/schemas/play.numbers';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class Play extends Document implements DataObject {
    @ApiProperty({ type: String, enum: PlayTypes }) @Prop({ required: true, type: String }) playType?: PlayTypes;
    @ApiProperty({ type: Number }) @Prop({ required: true }) amount?: number;
    @ApiProperty({ type: PlayNumbers })
    @Prop({ required: true, type: PlayNumbersSchema })
    playNumbers: PlayNumbers;
    @ApiProperty() @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId }) lotteryId?: ObjectId;

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string | ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string | ObjectId;
}

export const PlaySchema = SchemaFactory.createForClass(Play);
