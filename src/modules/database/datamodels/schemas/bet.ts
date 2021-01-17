import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Play, PlaySchema } from '@src/modules/database/datamodels/schemas/play';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class Bet extends Document implements DataObject {
    @ApiProperty({ type: [Play] }) @Prop({ immutable: true, type: [PlaySchema] }) plays: Play[];
    @ApiProperty({ type: Date }) @Prop({ immutable: true }) date: Date;
    @ApiProperty({ type: String }) @Prop({ required: true, immutable: true }) sn: string;

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    creationUserId: ObjectId;
    @ApiProperty({ type: Date }) @Prop() deletionDate?: Date;
    @ApiProperty({ type: String })
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    modificationUserId: ObjectId;
}

export const BetSchema = SchemaFactory.createForClass(Bet);
