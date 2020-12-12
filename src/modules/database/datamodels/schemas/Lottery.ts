import { DataObject } from './DataObject';
import { LotteryTime } from './LotteryTime';
import { OCStatus } from '../enums/OCStatus';
import { BettingLimit } from './BettingLimit';
import { PrizeLimit } from './PrizeLimit';
import { BankingFeeLimit } from './BankingFeeLimit';
import { Result } from './Result';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LotteryDocument = Lottery & Document;
@Schema()
export class Lottery  implements DataObject {
  @Prop({ required: true }) lotteryId: string;
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) nickname: string;
  @Prop({ required: true }) color: string;
  @Prop() logo?: string;
  @Prop({ type: String, enum: [OCStatus] }) status: OCStatus;
  @Prop({ type: LotteryTime, required: true }) times?: LotteryTime[];
  // Cuanto y a que se le puede apostar
  @Prop([BettingLimit]) bettingLimits?: BettingLimit[];
  // Cuanto se paga a un ganador por cada peso apostado
  @Prop([PrizeLimit]) prizeLimits?: PrizeLimit[];
  // Que porcentaje se le paga a la banca por cada jugada
  @Prop([BankingFeeLimit]) bankingFeeLimits?: BankingFeeLimit[];
  // Que porcentaje se le paga a la banca por el total de sus ventas
  @Prop() fallback?: number;
  @Prop() lastResults?: string;
  @Prop([Result]) results?: Result[];

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const LotterySchema = SchemaFactory.createForClass(Lottery);