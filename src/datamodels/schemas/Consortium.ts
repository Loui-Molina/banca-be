import { DataObject } from './DataObject';
import { ConsortiumPreference } from './ConsortiumPreference';
import { Supervisor } from './Supervisor';
import { Banking } from './Banking';
import { Transaction } from './Transaction';
import { Lottery } from './Lottery';

import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Consortium implements DataObject {
  supervisors: Map<string, Supervisor>;
  consortiumPrefs?: ConsortiumPreference;
  bankings?: Map<string, Banking>;
  lotteries?: Map<string, Lottery>;
  userId: string;
  transactions?: Transaction[];

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}
export const ConsortiumSchema = SchemaFactory.createForClass(Consortium);
