import { DataObject } from './DataObject';
import { BankingPreference } from './BankingPreference';
import { Transaction } from './Transaction';
import { Lottery } from './Lottery';
import { Bet } from './Bet';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './User';
import { Document } from 'mongoose';

export type BankingDocument = Banking & Document;

@Schema()
export class Banking implements DataObject {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User }) owner: User;
  @Prop({ required: true, type: BankingPreference })
  @Prop([BankingPreference])
  bankingPreferences?: BankingPreference;
  @Prop([Transaction]) transactions?: Transaction[];
  @Prop([Lottery]) lotteries?: Lottery[];
  @Prop([Bet]) bets?: Bet[];
  @Prop({ required: true }) name: string;
  @Prop({ required: true, default: 0 }) balance: number;

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const BankingSchema = SchemaFactory.createForClass(Banking);
