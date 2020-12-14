import { ConsortiumPreference } from './ConsortiumPreference';
import { Supervisor } from './Supervisor';
import { Banking } from './Banking';
import { Transaction } from './Transaction';
import { Lottery } from './Lottery';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ConsortiumDocument = Consortium & Document;

// TODO not usefull

@Schema()
export class Consortium {
  @Prop([Supervisor]) supervisors?: Supervisor[];
  @Prop({ type: ConsortiumPreference }) consortiumPrefs?: ConsortiumPreference;
  @Prop([Banking]) bankings?: Banking[];
  @Prop([Lottery]) lotteries?: Lottery[];
  @Prop({ required: true }) ownerUserId: string;
  @Prop([Transaction]) transactions?: Transaction[];

  // Data object members
  @Prop({ required: true, immutable: true, default: 'user1' })
  creationUserId?: string;
  @Prop({
    required: true,
    default: (user) => {
      return user._id;
    },
  })
  modificationUserId: string;
  @Prop() deletionDate?: Date;
}

export const ConsortiumSchema = SchemaFactory.createForClass(Consortium)
  .set('collection', 'consortium')
  .set('timestamps', true);
