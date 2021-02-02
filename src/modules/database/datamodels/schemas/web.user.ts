import { DataObject } from '@database/datamodels/schemas/data.object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transaction, TransactionSchema } from '@database/datamodels/schemas/transaction';
import { Bet, BetSchema } from '@database/datamodels/schemas/bet';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true, collection: 'webusers' })
export class WebUser extends Document implements DataObject {
    @ApiProperty() _id?: ObjectId;
    @ApiProperty() @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) bankingId: ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId }) ownerUserId: ObjectId;
    @Prop({ type: [TransactionSchema] }) transactions?: Transaction[];
    @Prop({ type: [BetSchema] }) bets?: Bet[];
    @ApiProperty() @Prop({ required: false }) startOfOperation?: Date;
    @ApiProperty() @Prop({ required: true, default: false }) status?: boolean;

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId }) creationUserId: ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;

    // eslint-disable-next-line @typescript-eslint/ban-types
    calculateBalance?: Function;
    createdAt: Date;
}

export const WebUserSchema = SchemaFactory.createForClass(WebUser);

WebUserSchema.methods.calculateBalance = async function calculateBalance(): Promise<number> {
    let balance = 0;
    const transactions: Transaction[] = this.transactions;
    transactions.forEach((item) => {
        balance += item.amount;
    });
    return balance;
};
