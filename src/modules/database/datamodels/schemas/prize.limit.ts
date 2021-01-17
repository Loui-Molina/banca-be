import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { DominicanLotteryPrizes } from '@src/modules/database/datamodels/enums/dominican.lottery.prizes';
import { UsLotteryPrizes } from '@src/modules/database/datamodels/enums/us.lottery.prizes';
import { BrasilPrizes } from '@src/modules/database/datamodels/enums/brasil.prizes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
// Monto a pagar por cada unidad monetaria al momento de haber un ganador
export class PrizeLimit extends Document implements DataObject {
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
    @Prop({ required: true, immutable: true }) creationUserId: string | ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string | ObjectId;
}

export const PrizeLimitSchema = SchemaFactory.createForClass(PrizeLimit);
