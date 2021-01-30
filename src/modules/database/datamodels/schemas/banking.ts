import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import {
    BankingPreference,
    BankingPreferenceSchema,
} from '@src/modules/database/datamodels/schemas/banking.preference';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transaction, TransactionSchema } from '@src/modules/database/datamodels/schemas/transaction';
import { Bet, BetSchema } from '@src/modules/database/datamodels/schemas/bet';
import { Lottery, LotterySchema } from '@src/modules/database/datamodels/schemas/lottery';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true, collection: 'bankings' })
export class Banking extends Document implements DataObject {
    @ApiProperty() _id?: ObjectId;
    @ApiProperty() @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId }) consortiumId: ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId }) ownerUserId: ObjectId;
    @Prop({ type: BankingPreferenceSchema })
    bankingPreferences?: BankingPreference;
    @Prop({ type: [TransactionSchema] }) transactions?: Transaction[];
    @Prop({ type: [LotterySchema] }) lotteries?: Lottery[];
    @Prop({ type: [BetSchema] }) bets?: Bet[];
    @Prop({ required: true }) name: string;
    @Prop({ required: true, default: 0 }) balance?: number;
    @ApiProperty() @Prop() startOfOperation?: Date;
    @ApiProperty() @Prop({ required: true, default: false }) status?: boolean;

    // Que porcentaje se le paga a la banca por cada jugada
    @Prop({ min: 0, max: 100 }) earningPercentage?: number;
    // Que porcentaje se le paga a la banca por el total de sus ventas
    @Prop({ min: 0, max: 100 }) fallbackPercentage?: number;
    @Prop() showPercentage?: boolean;

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId }) creationUserId: ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;

    // eslint-disable-next-line @typescript-eslint/ban-types
    calculateBalance?: Function;
    createdAt: Date;
}

export const BankingSchema = SchemaFactory.createForClass(Banking);

BankingSchema.methods.calculateBalance = async function calculateBalance(): Promise<number> {
    let balance = 0;
    const transactions: Transaction[] = this.transactions;
    transactions.forEach((item) => {
        balance += item.amount;
    });
    return balance;
};
