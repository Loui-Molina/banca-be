import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { BankingPreference, BankingPreferenceSchema } from '@src/modules/database/datamodels/schemas/banking.preference';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, ObjectId} from 'mongoose';
import {Transaction, TransactionSchema} from "@database/datamodels/schemas/Transaction";
import {Bet, BetSchema} from "@database/datamodels/schemas/Bet";
import {Lottery, LotterySchema} from "@database/datamodels/schemas/Lottery";
import * as mongoose from "mongoose";
import {UserSchema} from "@database/datamodels/schemas/User";

export type BankingDocument = Banking & Document;

@Schema()
export class Banking implements DataObject {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: UserSchema}) owner: ObjectId;
    @Prop({ type: BankingPreferenceSchema })
    bankingPreferences?: BankingPreference;
    @Prop({ type: [TransactionSchema] }) transactions?: Transaction[];
    @Prop({ type: [LotterySchema] }) lotteries?: Lottery[];
    @Prop({ type: [BetSchema] }) bets?: Bet[];
    @Prop({ required: true }) name: string;
    @Prop({ required: true, default: 0 }) balance: number;

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string;
}

export const BankingSchema = SchemaFactory.createForClass(Banking).set('timestamps', true);
