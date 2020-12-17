import { DataObject } from './DataObject';
import {
  BankingPreference,
  BankingPreferenceSchema,
} from './BankingPreference';
import { Transaction, TransactionSchema } from './Transaction';
import { Lottery, LotterySchema } from './Lottery';
import { Bet, BetSchema } from './Bet';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User, UserSchema } from './User';

export type BankingDocument = Banking & Document;

@Schema()
export class Banking implements DataObject {
  // @Prop({type: mongoose.Schema.Types.ObjectId, ref: UserSchema}) owner: User; // TODO CHECK
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

export const BankingSchema = SchemaFactory.createForClass(Banking).set(
  'timestamps',
  true,
);
