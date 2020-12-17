import { DataObject } from './DataObject';
import { LotteryTime, LotteryTimeSchema } from './LotteryTime';
import { OCStatus } from '../enums/OCStatus';
import { BettingLimit, BettingLimitSchema } from './BettingLimit';
import { PrizeLimit, PrizeLimitSchema } from './PrizeLimit';
import { BankingFeeLimit, BankingFeeLimitSchema } from './BankingFeeLimit';
import { Result, ResultSchema } from './Result';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LotteryDocument = Lottery & Document;

@Schema()
export class Lottery implements DataObject {
  // @Prop({ required: true }) lotteryId: string;
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) nickname: string;
  @Prop({ required: true }) color: string;
  @Prop() logo?: string;
  @Prop({ type: String, enum: [OCStatus] }) status: OCStatus;
  @Prop({ type: LotteryTimeSchema, required: true }) times: LotteryTime[];
  // Cuanto y a que se le puede apostar
  @Prop({ type: [BettingLimitSchema] }) bettingLimits?: BettingLimit[];
  // Cuanto se paga a un ganador por cada peso apostado
  @Prop({ type: [PrizeLimitSchema] }) prizeLimits?: PrizeLimit[];
  // Que porcentaje se le paga a la banca por cada jugada
  @Prop({ type: [BankingFeeLimitSchema] }) bankingFeeLimits?: BankingFeeLimit[];
  // Que porcentaje se le paga a la banca por el total de sus ventas
  @Prop() fallback?: number;
  @Prop() lastResults?: string;
  @Prop({ type: [ResultSchema] }) results?: Result[];

  // Data object members
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const LotterySchema = SchemaFactory.createForClass(Lottery).set(
  'timestamps',
  true,
);
