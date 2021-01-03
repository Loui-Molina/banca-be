import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { DominicanLotteryPrizes } from '@src/modules/database/datamodels/enums/dominican.lottery.prizes';
import { UsLotteryPrizes } from '@src/modules/database/datamodels/enums/us.lottery.prizes';
import { BrasilPrizes } from '@src/modules/database/datamodels/enums/brasil.prizes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {PlayTypes} from "@database/datamodels/enums/play.types";

// Porcentaje que se le paga a cada banca por cada jugada que vende
export type BankingFeeLimitDocument = BankingFeeLimit & Document;

@Schema()
export class BankingFeeLimit implements DataObject {
    @Prop({
        type: String,
        enum: PlayTypes,
    })
    playType?: PlayTypes;
    @Prop({ min: 0, max: 100 }) feePercentage?: number;

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string;
}

export const BankingFeeLimitSchema = SchemaFactory.createForClass(BankingFeeLimit).set('timestamps', true);
