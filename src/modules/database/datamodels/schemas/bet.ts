import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Play, PlaySchema } from '@src/modules/database/datamodels/schemas/play';
import {Document, ObjectId} from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionSchema } from '@database/datamodels/schemas/transaction';
import { PlayTypes } from '@database/datamodels/enums/play.types';
import { BetStatus } from '@database/datamodels/enums/bet.status';

export type BetDocument = Bet & Document;
@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class Bet implements DataObject {
    @ApiProperty() _id?: ObjectId;
    @ApiProperty({ type: [Play] }) @Prop({ immutable: true, type: [PlaySchema] }) plays: Play[];
    @ApiProperty({ type: Date }) @Prop({ immutable: true }) date: Date;
    @ApiProperty({ type: String }) @Prop({ required: true, immutable: true }) sn: string;
    @ApiProperty({ type: String, enum: BetStatus }) @Prop({ required: true, type: String }) betStatus?: BetStatus;

    // Data object members
    @ApiProperty({ type: String }) @Prop({ required: true, immutable: true }) creationUserId: string;
    @ApiProperty({ type: Date }) @Prop() deletionDate?: Date;
    @ApiProperty({ type: String }) @Prop({ required: true }) modificationUserId: string;
}

export const BetSchema = SchemaFactory.createForClass(Bet);
