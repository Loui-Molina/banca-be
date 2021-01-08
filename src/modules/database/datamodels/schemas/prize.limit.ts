import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { DominicanLotteryPrizes } from '@src/modules/database/datamodels/enums/dominican.lottery.prizes';
import { UsLotteryPrizes } from '@src/modules/database/datamodels/enums/us.lottery.prizes';
import { BrasilPrizes } from '@src/modules/database/datamodels/enums/brasil.prizes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type PrizeLimitDocument = PrizeLimit & Document;

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
// Monto a pagar por cada unidad monetaria al momento de haber un ganador
export class PrizeLimit implements DataObject {
    @ApiProperty({
        type: String,
        enum: [
            DominicanLotteryPrizes.first,
            DominicanLotteryPrizes.second,
            DominicanLotteryPrizes.third,
            DominicanLotteryPrizes.double,
            DominicanLotteryPrizes.pale,
            DominicanLotteryPrizes.paleTwoThree,
            DominicanLotteryPrizes.triplet,
            DominicanLotteryPrizes.twoNumbers,
            DominicanLotteryPrizes.superPale,
            UsLotteryPrizes.cashThreeStraight,
            UsLotteryPrizes.cashThreeStraightDoubles,
            UsLotteryPrizes.playFourStraight,
            UsLotteryPrizes.pickFiveStraight,
            UsLotteryPrizes.cashThreeBoxThreeWay,
            UsLotteryPrizes.cashThreeBoxSixWay,
            UsLotteryPrizes.playFourBoxFourWay,
            UsLotteryPrizes.playFourBoxSixWay,
            UsLotteryPrizes.playFourBoxTwelfthWay,
            UsLotteryPrizes.playFourBoxTwentyFourthWay,
            UsLotteryPrizes.pickFiveBoxFifthWay,
            UsLotteryPrizes.pickFiveBoxTenthWay,
            UsLotteryPrizes.pickFiveBoxTwentiethWay,
            UsLotteryPrizes.pickFiveBoxThirtiethWay,
            UsLotteryPrizes.pickFiveBoxSixtiethWay,
            UsLotteryPrizes.pickFiveBoxOneHundredTwentiethWay,
            BrasilPrizes.singulationOne,
            BrasilPrizes.singulationTwo,
            BrasilPrizes.singulationThree,
            BrasilPrizes.bolitaOne,
            BrasilPrizes.bolitaTwo,
        ],
        required: false,
    })
    @Prop({
        type: String,
        enum: [DominicanLotteryPrizes, UsLotteryPrizes, BrasilPrizes],
    })
    playType?: DominicanLotteryPrizes | UsLotteryPrizes | BrasilPrizes;
    @ApiProperty() @Prop({ required: true }) paymentAmount?: number;
    @ApiProperty({ required: true }) @Prop() status: boolean;

    // Data object members
    @ApiProperty({ required: false }) @Prop({ required: true, immutable: true }) creationUserId: string;
    @ApiProperty({ required: false }) @Prop() deletionDate?: Date;
    @ApiProperty({ required: false }) @Prop({ required: true }) modificationUserId: string;
}

export const PrizeLimitSchema = SchemaFactory.createForClass(PrizeLimit);
