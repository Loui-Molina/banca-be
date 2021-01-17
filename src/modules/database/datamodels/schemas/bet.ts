import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Play, PlaySchema } from '@src/modules/database/datamodels/schemas/play';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionSchema } from '@database/datamodels/schemas/transaction';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class Bet extends Document implements DataObject {
    @ApiProperty({ type: [Play] }) @Prop({ immutable: true, type: [PlaySchema] }) plays: Play[];
    @ApiProperty({ type: Date }) @Prop({ immutable: true }) date: Date;
    @ApiProperty({ type: String }) @Prop({ required: true, immutable: true }) sn: string;

    // Data object members
    @ApiProperty({ type: String }) @Prop({ required: true, immutable: true }) creationUserId: string | ObjectId;
    @ApiProperty({ type: Date }) @Prop() deletionDate?: Date;
    @ApiProperty({ type: String }) @Prop({ required: true }) modificationUserId: string | ObjectId;
}

export const BetSchema = SchemaFactory.createForClass(Bet);
