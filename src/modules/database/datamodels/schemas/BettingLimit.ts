import { DataObject } from '@database/datamodels/schemas/DataObject';
import { DominicanLotteryPrizes } from '@database/datamodels/enums/DominicanLotteryPrizes';
import { UsLotteryPrizes } from '@database/datamodels/enums/UsLotteryPrizes';
import { BrasilPrizes } from '@database/datamodels/enums/BrasilPrizes';
import { OCStatus } from '@database/datamodels/enums/OCStatus';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Estado y limite de apuesta en cada jugada

export type BettingLimitDocument = BettingLimit & Document;

@Schema()
export class BettingLimit implements DataObject {
    @Prop({
        type: String,
        enum: [DominicanLotteryPrizes, UsLotteryPrizes, BrasilPrizes],
    })
    playType: DominicanLotteryPrizes | UsLotteryPrizes | BrasilPrizes;
    @Prop({ type: String, enum: OCStatus }) status: OCStatus;
    @Prop({ required: true }) betAmount?: number;

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string;
}

export const BettingLimitSchema = SchemaFactory.createForClass(BettingLimit).set('timestamps', true);
