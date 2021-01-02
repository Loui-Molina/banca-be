import { ConsortiumPreference, ConsortiumPreferenceSchema } from './consortium.preference';
import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import {Transaction, TransactionSchema} from "@src/modules/database/datamodels/schemas/transaction";
import {Lottery, LotterySchema} from "@src/modules/database/datamodels/schemas/lottery";
import {Supervisor, SupervisorSchema} from "@src/modules/database/datamodels/schemas/supervisor";
import {Banking, BankingSchema} from "@src/modules/database/datamodels/schemas/banking";

export type ConsortiumDocument = Consortium & Document;

@Schema()
export class Consortium {
    @ApiProperty() @Prop({ type: [SupervisorSchema] }) supervisors?: Supervisor[];
    @ApiProperty()
    @Prop({ type: ConsortiumPreferenceSchema })
    @ApiProperty()
    consortiumPrefs?: ConsortiumPreference;
    @ApiProperty() @Prop({ type: [BankingSchema] }) bankings?: Banking[];
    @ApiProperty() @Prop({ type: [LotterySchema] }) lotteries?: Lottery[];
    @ApiProperty() @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId }) ownerUserId: ObjectId;
    @ApiProperty() @Prop({ required: true }) name: string;
    @ApiProperty() @Prop({ required: true, default: false}) status: boolean;
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
}

export const ConsortiumSchema = SchemaFactory.createForClass(Consortium)
    .set('collection', 'consortium')
    .set('timestamps', true);


ConsortiumSchema.methods.calculateBalance = async function calculateBalance(): Promise<number> {
    let balance = 0;
    const transactions: Transaction[] = this.transactions;
    for(let i = 0; i < transactions.length; i++){
        balance += transactions[i].amount;
    }
    return balance;
};
