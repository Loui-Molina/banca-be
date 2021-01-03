import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { TransactionType } from '@src/modules/database/datamodels/enums/transaction.type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, ObjectId} from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";
import * as mongoose from "mongoose";

export type TransactionDocument = Transaction & Document;
@Schema()
export class Transaction implements DataObject {
    @ApiProperty() _id?: ObjectId;
    @ApiProperty() @Prop({ required: true }) amount?: number;
    @ApiProperty({ type: String, enum: TransactionType }) @Prop({ type: String, enum: TransactionType }) type?: TransactionType;
    @ApiProperty() @Prop({ required: true }) lastBalance?: number;
    @ApiProperty() @Prop({ required: true }) actualBalance?: number;
    //id del usuario donde se genero la transaccion
    @ApiProperty() @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId }) originUserId?: ObjectId;
    //id del usuario donde se genero la  transaccion
    @ApiProperty() @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId }) destinationUserId?: ObjectId;

    // Data object members
    @ApiProperty() @Prop({ required: true, immutable: true }) creationUserId: string;
    @ApiProperty() @Prop() deletionDate?: Date;
    @ApiProperty() @Prop({ required: true }) modificationUserId: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction).set('timestamps', true);
