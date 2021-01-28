import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Days } from '@database/datamodels/enums/days';
import { Prop } from '@nestjs/mongoose';
import { Result, ResultSchema } from '@database/datamodels/schemas/result';
import { PrizeLimit } from '@database/datamodels/schemas/prize.limit';
import { BettingLimit } from '@database/datamodels/schemas/betting.limit';

export class ConsortiumLotteryDto {
    @ApiProperty({ required: false }) _id?: ObjectId;
    @ApiProperty({ required: false }) bankings?: ObjectId[];
    @ApiProperty({ isArray: true, required: false, type: BettingLimit }) bettingLimits?: BettingLimit[];
    @ApiProperty({ isArray: true, required: false, type: PrizeLimit }) prizeLimits?: PrizeLimit[];
    @ApiProperty() name: string;
    @ApiProperty() nickname: string;
    @ApiProperty() color: string;
    @ApiProperty() playTime: string;
    @ApiProperty() status: boolean;
    @ApiProperty() @Prop({ type: [ResultSchema] }) results?: Result[];
    @ApiProperty({ required: false }) openTime?: string;
    @ApiProperty({ required: false }) closeTime?: string;
    @ApiProperty({ type: Number, enum: Days, isArray: true }) day: Days[];
}
