import { DataObject } from '@database/datamodels/schemas/DataObject';
import { LotteryTime, LotteryTimeSchema } from '@database/datamodels/schemas/LotteryTime';
import { BettingLimit, BettingLimitSchema } from '@database/datamodels/schemas/BettingLimit';
import { PrizeLimit, PrizeLimitSchema } from '@database/datamodels/schemas/PrizeLimit';
import { BankingFeeLimit, BankingFeeLimitSchema } from '@database/datamodels/schemas/BankingFeeLimit';
import { Result, ResultSchema } from '@database/datamodels/schemas/Result';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

export type LotteryDocument = Lottery & Document;

@Schema()
export class Lottery implements DataObject {
    // @Prop({ required: true }) lotteryId: string;
    @ApiProperty() @Prop({ required: true }) name: string;
    @ApiProperty() @Prop({ required: true }) nickname: string;
    @ApiProperty() @Prop({ required: true }) color: string;
    @ApiProperty() @Prop() logo?: string;
    @ApiProperty() @Prop() status: boolean;
    @ApiProperty() @Prop({ type: LotteryTimeSchema }) time: LotteryTime;
    // Cuanto y a que se le puede apostar
    @ApiProperty() @Prop({ type: [BettingLimitSchema] }) bettingLimits?: BettingLimit[];
    // Cuanto se paga a un ganador por cada peso apostado
    @ApiProperty() @Prop({ type: [PrizeLimitSchema] }) prizeLimits?: PrizeLimit[];
    // Que porcentaje se le paga a la banca por cada jugada
    @ApiProperty() @Prop({ type: [BankingFeeLimitSchema] }) bankingFeeLimits?: BankingFeeLimit[];
    // Que porcentaje se le paga a la banca por el total de sus ventas
    @ApiProperty() @Prop() fallback?: number;
    @ApiProperty() @Prop() lastResults?: string;
    @ApiProperty() @Prop({ type: [ResultSchema] }) results?: Result[];

    // Data object members
    @ApiProperty() @Prop({ required: true, immutable: true }) creationUserId: string;
    @ApiProperty() @Prop() deletionDate?: Date;
    @ApiProperty()  @Prop({ required: true }) modificationUserId: string;
}

export const LotterySchema = SchemaFactory.createForClass(Lottery).set('timestamps', true);
