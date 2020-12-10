import { DataObject } from './DataObject';
import { BankingPreference } from './BankingPreference';
import { Transaction } from './Transaction';
import { Lottery } from './Lottery';
import { Bet } from './Bet';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './User';
import { Inject } from '@nestjs/common';

@Schema()
export class Banking implements DataObject {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  owner?: User; // TODO CHECK objectId and ref
  @Prop({ required: true }) bankingPreferences?: BankingPreference;
  @Prop() transactions?: Transaction[];
  @Prop() lotteries?: Map<string, Lottery>;
  @Prop() bets?: Bet[];

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const BankingSchema = SchemaFactory.createForClass(Banking);
