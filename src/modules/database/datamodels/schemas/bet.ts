import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Play, PlaySchema } from '@src/modules/database/datamodels/schemas/play';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BetStatus } from '@database/datamodels/enums/bet.status';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class Bet extends Document implements DataObject {
    @ApiProperty() _id?: ObjectId;
    @ApiProperty({ type: [Play] }) @Prop({ immutable: true, type: [PlaySchema] }) plays: Play[];
    @Prop({ type: [String] }) lotterysPlayed: string[];
    @ApiProperty({ type: Date }) @Prop({ immutable: true }) date: Date;
    @ApiProperty({ type: String }) @Prop({ required: true, immutable: true }) sn: string;
    @ApiProperty({ type: String, enum: BetStatus }) @Prop({ required: true, type: String }) betStatus?: BetStatus;
    @ApiProperty({ type: Number }) @Prop({ required: false }) amountWin?: number = 0;
    @ApiProperty({ type: Date }) @Prop({ required: false }) claimDate?: Date;
    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    creationUserId: ObjectId;
    @ApiProperty({ type: Date }) @Prop() deletionDate?: Date;
    @ApiProperty({ type: String })
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    modificationUserId: ObjectId;
}

export const BetSchema = SchemaFactory.createForClass(Bet);
