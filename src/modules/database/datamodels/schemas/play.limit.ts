import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { DominicanLotteryPrizes } from '@src/modules/database/datamodels/enums/dominican.lottery.prizes';
import { UsLotteryPrizes } from '@src/modules/database/datamodels/enums/us.lottery.prizes';
import { BrasilPrizes } from '@src/modules/database/datamodels/enums/brasil.prizes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// cantidad de veces que se puede hacer una jugada

export type PlayLimitDocument = PlayLimit & Document;
@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class PlayLimit implements DataObject {
    @Prop({ required: true }) limit?: number;
    @Prop({
        type: String,
        enum: [DominicanLotteryPrizes, UsLotteryPrizes, BrasilPrizes],
    })
    playType?: DominicanLotteryPrizes | UsLotteryPrizes | BrasilPrizes;
    @Prop() appliedBankingsIds?: string[];

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string;
}

export const PlayLimitSchema = SchemaFactory.createForClass(PlayLimit);
