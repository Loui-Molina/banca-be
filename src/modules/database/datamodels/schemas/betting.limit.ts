import {DataObject} from '@src/modules/database/datamodels/schemas/data.object';
import {DominicanLotteryPrizes} from '@src/modules/database/datamodels/enums/dominican.lottery.prizes';
import {UsLotteryPrizes} from '@src/modules/database/datamodels/enums/us.lottery.prizes';
import {BrasilPrizes} from '@src/modules/database/datamodels/enums/brasil.prizes';
import {OCStatus} from '@src/modules/database/datamodels/enums/oc.status';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {PlayTypes} from "@database/datamodels/enums/play.types";
import {ApiProperty} from "@nestjs/swagger";

// Estado y limite de apuesta en cada jugada

export type BettingLimitDocument = BettingLimit & Document;

@Schema({ timestamps: true, optimisticConcurrency: true,useNestedStrict: true, strict: true })
export class BettingLimit implements DataObject {
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
    @ApiProperty({required: true}) @Prop() status: boolean;
    @ApiProperty({required: false}) @Prop({required: true}) betAmount?: number;

    // Data object members
    @ApiProperty({required: false}) @Prop({required: true, immutable: true}) creationUserId: string;
    @ApiProperty({required: false}) @Prop() deletionDate?: Date;
    @ApiProperty({required: false}) @Prop({required: true}) modificationUserId: string;
}

export const BettingLimitSchema = SchemaFactory.createForClass(BettingLimit);
