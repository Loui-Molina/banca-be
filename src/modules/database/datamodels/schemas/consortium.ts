import { ConsortiumPreference, ConsortiumPreferenceSchema } from './consortium.preference';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transaction, TransactionSchema } from '@src/modules/database/datamodels/schemas/transaction';
import { Supervisor, SupervisorSchema } from '@src/modules/database/datamodels/schemas/supervisor';
import { Banking, BankingSchema } from '@src/modules/database/datamodels/schemas/banking';
import { ConsortiumLottery, ConsortiumLotterySchema } from '@database/datamodels/schemas/consortium.lottery';

export type ConsortiumDocument = Consortium & Document;

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class Consortium {
    @ApiProperty() _id?: ObjectId;
    @ApiProperty() @Prop({ type: [SupervisorSchema] }) supervisors?: Supervisor[];
    @ApiProperty()
    @Prop({ type: ConsortiumPreferenceSchema })
    @ApiProperty()
    consortiumPrefs?: ConsortiumPreference;
    @ApiProperty() @Prop({ type: [ConsortiumLotterySchema] }) consortiumLotteries?: ConsortiumLottery[];
    @ApiProperty() @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId }) ownerUserId: ObjectId;
    @ApiProperty() @Prop({ required: true, unique: true }) name: string;
    @ApiProperty() @Prop({ required: true, default: false }) status: boolean;
    @ApiProperty() @Prop() firstTransactionDate?: Date;
    @ApiProperty() @Prop({ type: [TransactionSchema] }) transactions?: Transaction[];

    // Data object members
    @ApiProperty()
    @Prop({ required: true, immutable: true, type: mongoose.SchemaTypes.ObjectId })
    creationUserId: ObjectId;
    @ApiProperty() @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId }) modificationUserId: ObjectId;
    @ApiProperty() createdAt?: Date;
    @ApiProperty() updatedAt?: Date;
    @ApiProperty() @Prop() deletionDate?: Date;

    calculateBalance?: Function;
}

export const ConsortiumSchema = SchemaFactory.createForClass(Consortium);

ConsortiumSchema.methods.calculateBalance = async function calculateBalance(): Promise<number> {
    let balance = 0;
    const transactions: Transaction[] = this.transactions;
    transactions.forEach((item) => {
        balance += item.amount;
    });
    return balance;
};
