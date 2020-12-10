import { DataObject } from './DataObject';
import { LotteryTime } from './LotteryTime';
import { OCStatus } from '../enums/OCStatus';
import { BettingLimit } from './BettingLimit';
import { PrizeLimit } from './PrizeLimit';
import { BankingFeeLimit } from './BankingFeeLimit';
import { Result } from './Result';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Lottery implements DataObject {
  lotteryId?: string;
  name?: string;
  nickname?: string;
  color?: string;
  logo?: string;
  status?: OCStatus;
  times?: LotteryTime[];
  bettingLimits?: BettingLimit[]; // Cuanto y a que se le puede apostar
  prizeLimits?: PrizeLimit[]; // Cuanto se paga a un ganador por cada peso apostado
  bankingFeeLimits?: BankingFeeLimit[]; // Que porcentaje se le paga a la banca por cada jugada
  fallback?: number; // Que porcentaje se le paga a la banca por el total de sus ventas
  lastResults?: string;
  results?: Map<string, Result>;

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const LotterySchema = SchemaFactory.createForClass(Lottery);
