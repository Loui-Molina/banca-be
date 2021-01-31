import { ConsortiumPreference, ConsortiumPreferenceSchema } from './consortium.preference';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transaction, TransactionSchema } from '@database/datamodels/schemas/transaction';
import { Supervisor, SupervisorSchema } from '@database/datamodels/schemas/supervisor';
import { ConsortiumLottery, ConsortiumLotterySchema } from '@database/datamodels/schemas/consortium.lottery';

@Schema({
    timestamps: true,
    optimisticConcurrency: true,
    useNestedStrict: true,
    strict: true,
    collection: 'consortiums',
})
export class Consortium extends Document {
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
    @ApiProperty() @Prop() startOfOperation?: Date;
    @ApiProperty() @Prop({ type: [TransactionSchema] }) transactions?: Transaction[];

    /** Data object members*/
    @ApiProperty()
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    creationUserId: ObjectId;
    @ApiProperty() @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;
    @ApiProperty() createdAt?: Date;
    @ApiProperty() updatedAt?: Date;
    @ApiProperty() @Prop() deletionDate?: Date;

    // CUSTOM FUNCTIONS
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
