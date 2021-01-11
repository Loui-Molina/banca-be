import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Days } from '@database/datamodels/enums/days';
import { Prop } from '@nestjs/mongoose';
import { Result, ResultSchema } from '@database/datamodels/schemas/result';
import { PrizeLimit, PrizeLimitSchema } from '@database/datamodels/schemas/prize.limit';
import { BettingLimit } from '@database/datamodels/schemas/betting.limit';

export class ConsortiumUpdateLotteryDto {
    @ApiProperty({ required: false }) _id?: ObjectId;
    @ApiProperty({ required: false }) bankings?: ObjectId[];
    @ApiProperty({ isArray: true, required: false, type: BettingLimit }) bettingLimits?: BettingLimit[];
    @ApiProperty({ isArray: true, required: false, type: PrizeLimit }) prizeLimits?: PrizeLimit[];
}
