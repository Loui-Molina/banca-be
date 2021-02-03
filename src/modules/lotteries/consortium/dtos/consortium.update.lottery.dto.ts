import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { PrizeLimit } from '@database/datamodels/schemas/prize.limit';
import { BettingLimit } from '@database/datamodels/schemas/betting.limit';
import { Allow, IsArray, IsMongoId, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PrizeLimitUpdateLotteryDto } from '@lotteries/consortium/dtos/prize.limit.update.lottery.dto';
import {BettingLimitUpdateLotteryDto} from "@lotteries/consortium/dtos/betting.limit.update.lottery.dto";

export class ConsortiumUpdateLotteryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsMongoId()
    _id?: ObjectId;
    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    bankings?: ObjectId[];
    @ApiProperty({ isArray: true, required: false, type: BettingLimitUpdateLotteryDto })
    @IsArray()
    @Type(() => BettingLimitUpdateLotteryDto)
    bettingLimits?: BettingLimitUpdateLotteryDto[];
    @ApiProperty({ isArray: true, required: false, type: PrizeLimitUpdateLotteryDto })
    @IsArray()
    @Type(() => PrizeLimitUpdateLotteryDto)
    prizeLimits?: PrizeLimitUpdateLotteryDto[];
}
