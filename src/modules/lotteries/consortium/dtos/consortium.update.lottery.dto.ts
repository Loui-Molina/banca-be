import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsArray, IsMongoId, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PrizeLimitUpdateLotteryDto } from '@lotteries/consortium/dtos/prize.limit.update.lottery.dto';
import { BettingLimitUpdateLotteryDto } from '@lotteries/consortium/dtos/betting.limit.update.lottery.dto';
import { BlockedNumberDto } from '@database/dto/blocked.number.dto';

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
    @ApiProperty({ isArray: true, required: false, type: BlockedNumberDto })
    @IsArray()
    @Type(() => BlockedNumberDto)
    blockedNumbers?: BlockedNumberDto[];
}
