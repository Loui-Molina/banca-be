import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { DominicanLotteryPrizes } from '@src/modules/database/datamodels/enums/dominican.lottery.prizes';
import { UsLotteryPrizes } from '@src/modules/database/datamodels/enums/us.lottery.prizes';
import { BrasilPrizes } from '@src/modules/database/datamodels/enums/brasil.prizes';
import { OCStatus } from '@src/modules/database/datamodels/enums/oc.status';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { PlayTypes } from '@database/datamodels/enums/play.types';
import { ApiProperty } from '@nestjs/swagger';

// Estado y limite de apuesta en cada jugada

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class BettingLimit extends Document implements DataObject {
    @ApiProperty({
        required: true,
        type: String,
        enum: PlayTypes,
    })
    @Prop({
        type: String,
        enum: PlayTypes,
    })
    playType: PlayTypes;
    @ApiProperty({ required: true }) @Prop() status: boolean;
    @ApiProperty({ required: false }) @Prop({ required: true }) betAmount?: number;

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string | ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string | ObjectId;
}

export const BettingLimitSchema = SchemaFactory.createForClass(BettingLimit);
