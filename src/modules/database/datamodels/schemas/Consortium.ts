import { ConsortiumPreference, ConsortiumPreferenceSchema } from './ConsortiumPreference';
import { Supervisor, SupervisorSchema } from './Supervisor';
import { Banking, BankingSchema } from './Banking';
import { Transaction, TransactionSchema } from './Transaction';
import { Lottery, LotterySchema } from './Lottery';
import {Document, ObjectId} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {ApiProperty} from "@nestjs/swagger";
import * as mongoose from "mongoose";

export type ConsortiumDocument = Consortium & Document;

// TODO usefull

@Schema()
export class Consortium {
  @ApiProperty() @Prop({ type: [SupervisorSchema] }) supervisors?: Supervisor[];
  @ApiProperty() @Prop({ type: ConsortiumPreferenceSchema })
  @ApiProperty() consortiumPrefs?: ConsortiumPreference;
  @ApiProperty() @Prop({ type: [BankingSchema] }) bankings?: Banking[];
  @ApiProperty()  @Prop({ type: [LotterySchema] }) lotteries?: Lottery[];
  @ApiProperty() @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId }) ownerUserId: ObjectId;
  @ApiProperty() @Prop({ required: true }) name: string;
  @ApiProperty() @Prop({ type: [TransactionSchema] }) transactions?: Transaction[];

  // Data object members
  @ApiProperty() @Prop({ required: true, immutable: true }) creationUserId: string;
  @ApiProperty() @Prop({ required: true }) modificationUserId: string;
  @ApiProperty() createdAt?: Date;
  @ApiProperty() updatedAt?: Date;
  @ApiProperty() @Prop() deletionDate?: Date;
}

export const ConsortiumSchema = SchemaFactory.createForClass(Consortium)
  .set('collection', 'consortium')
  .set('timestamps', true);
