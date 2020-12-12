import { DataObject } from './DataObject';
import { BankingPreference } from './BankingPreference';
import { Transaction } from './Transaction';
import { Lottery } from './Lottery';
import { Bet } from './Bet';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Banking implements DataObject {
  @Prop({
    required: true /*, ref: User.name TODO CHECK*/,
  })
  owner: string;
  @Prop({ required: true, type: BankingPreference })
  bankingPreferences?: BankingPreference;
  @Prop([Transaction]) transactions?: Transaction[];
  @Prop([Lottery]) lotteries?: Lottery[];
  @Prop([Bet]) bets?: Bet[];
  @Prop({ required: true }) name: string;

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const BankingSchema = SchemaFactory.createForClass(Banking);
