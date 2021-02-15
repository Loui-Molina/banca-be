import { DataObject } from './data.object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

class Payment extends mongoose.Document implements DataObject {
    date: Date;
    amount: number;

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    creationUserId: mongoose.ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: mongoose.ObjectId;
}

// TODO CRONJOB THAT CHECK PAYMENTS AND UPDATES DUE AMOUNT, IMPLEMENT FEES
@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class Subscriptions extends mongoose.Document implements DataObject {
    consortiumId: mongoose.ObjectId;
    monthlyFee: number;
    feePerBanking: number;
    bankingAmount: number;
    payments: Payment[];

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    creationUserId: mongoose.ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: mongoose.ObjectId;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscriptions);
