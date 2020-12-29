import { ConsortiumPreference, ConsortiumPreferenceSchema } from './ConsortiumPreference';
import { Supervisor, SupervisorSchema } from './Supervisor';
import { Banking, BankingSchema } from './Banking';
import { Transaction, TransactionSchema } from './Transaction';
import { Lottery, LotterySchema } from './Lottery';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ConsortiumDocument = Consortium & Document;

// TODO usefull

@Schema()
export class Consortium {
  @Prop({ type: [SupervisorSchema] }) supervisors?: Supervisor[];
  @Prop({ type: ConsortiumPreferenceSchema })
  consortiumPrefs?: ConsortiumPreference;
  @Prop({ type: [BankingSchema] }) bankings?: Banking[];
  @Prop({ type: [LotterySchema] }) lotteries?: Lottery[];
  @Prop({ required: true }) ownerUserId: string;
  @Prop({ type: [TransactionSchema] }) transactions?: Transaction[];

  // Data object members
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) modificationUserId: string;
  @Prop() deletionDate?: Date;
}

export const ConsortiumSchema = SchemaFactory.createForClass(Consortium)
  .set('collection', 'consortium')
  .set('timestamps', true);
