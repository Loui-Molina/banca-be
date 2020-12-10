import { DataObject } from './DataObject';
import { TransactionType } from '../enums/TransactionType';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Transaction implements DataObject {
  transactionId?: string;
  amount?: number;
  type?: TransactionType;
  lastBalance?: number;
  actualBalance?: number;
  originUserId?: string; //id del usuario donde se genero la transaccion
  destinationUserId?: string; //id del usuario donde se genero la transaccion

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
