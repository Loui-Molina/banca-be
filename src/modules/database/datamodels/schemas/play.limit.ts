import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { DominicanLotteryPrizes } from '@src/modules/database/datamodels/enums/dominican.lottery.prizes';
import { UsLotteryPrizes } from '@src/modules/database/datamodels/enums/us.lottery.prizes';
import { BrasilPrizes } from '@src/modules/database/datamodels/enums/brasil.prizes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';

// cantidad de veces que se puede hacer una jugada

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class PlayLimit extends Document implements DataObject {
    @Prop({ required: true }) limit?: number;
    @Prop({
        type: String,
        enum: [DominicanLotteryPrizes, UsLotteryPrizes, BrasilPrizes],
    })
    playType?: DominicanLotteryPrizes | UsLotteryPrizes | BrasilPrizes;
    @Prop() appliedBankingsIds?: string[];

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId }) creationUserId: ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;
}

export const PlayLimitSchema = SchemaFactory.createForClass(PlayLimit);
