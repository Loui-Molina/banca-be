import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { TransactionType } from '@src/modules/database/datamodels/enums/transaction.type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;
@Schema()
export class Transaction implements DataObject {
    @Prop() transactionId?: string;
    @Prop({ required: true }) amount?: number;
    @Prop({ type: String, enum: TransactionType }) type?: TransactionType;
    @Prop({ required: true }) lastBalance?: number;
    @Prop({ required: true }) actualBalance?: number;
    //id del usuario donde se genero la transaccion
    @Prop({ required: true }) originUserId?: string;
    //id del usuario donde se genero la  transaccion
    @Prop({ required: true }) destinationUserId?: string;

    // id field to be used incrementally
    // @Prop({_id: true})_id: number; // TODO CHECK

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction).set('timestamps', true);
