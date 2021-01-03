import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { DominicanLotteryPrizes } from '@src/modules/database/datamodels/enums/dominican.lottery.prizes';
import { UsLotteryPrizes } from '@src/modules/database/datamodels/enums/us.lottery.prizes';
import { BrasilPrizes } from '@src/modules/database/datamodels/enums/brasil.prizes';
import { OCStatus } from '@src/modules/database/datamodels/enums/oc.status';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {PlayTypes} from "@database/datamodels/enums/play.types";

// Estado y limite de apuesta en cada jugada

export type BettingLimitDocument = BettingLimit & Document;

@Schema()
export class BettingLimit implements DataObject {
    @Prop({
        type: String,
        enum: PlayTypes,
    })
    playType: PlayTypes;
    @Prop({ type: String, enum: OCStatus }) status: OCStatus;
    @Prop({ required: true }) betAmount?: number;

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string;
}

export const BettingLimitSchema = SchemaFactory.createForClass(BettingLimit).set('timestamps', true);
