import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { TransactionType } from '@src/modules/database/datamodels/enums/transaction.type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { TransactionObjects } from '@database/datamodels/enums/transaction.objects';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class Transaction extends Document implements DataObject {
    @ApiProperty() _id?: ObjectId;
    @ApiProperty() createdAt?: Date;
    @ApiProperty() @Prop({ required: true }) amount?: number;
    @ApiProperty({ type: String, enum: TransactionType })
    @Prop({ type: String, enum: TransactionType })
    type?: TransactionType;

    @ApiProperty() @Prop({ required: true }) lastBalance?: number;
    @ApiProperty() @Prop({ required: true }) actualBalance?: number;
    //id del objeto donde se genero la transaccion puede ser usuario cliente, banca o consorcio
    @ApiProperty() @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId }) originId?: ObjectId;
    @ApiProperty({ type: String, enum: TransactionObjects })
    @Prop({ type: String, enum: TransactionObjects })
    originObject?: TransactionObjects;
    //id del objeto donde se genero la transaccion puede ser usuario cliente, banca o consorcio
    @ApiProperty() @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId }) destinationId?: ObjectId;
    @ApiProperty({ type: String, enum: TransactionObjects })
    @Prop({ type: String, enum: TransactionObjects })
    destinationObject?: TransactionObjects;

    // Data object members
    @ApiProperty() @Prop({ required: true, immutable: true }) creationUserId: string | ObjectId;

    @ApiProperty() @Prop() deletionDate?: Date;
    @ApiProperty() @Prop({ required: true }) modificationUserId: string | ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
