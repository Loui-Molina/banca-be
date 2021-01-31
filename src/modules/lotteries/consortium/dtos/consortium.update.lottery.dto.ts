import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { PrizeLimit } from '@database/datamodels/schemas/prize.limit';
import { BettingLimit } from '@database/datamodels/schemas/betting.limit';
import { IsArray, IsMongoId, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ConsortiumUpdateLotteryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsMongoId()
    _id?: ObjectId;
    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    bankings?: ObjectId[];
    @ApiProperty({ isArray: true, required: false, type: BettingLimit })
    @IsArray()
    bettingLimits?: BettingLimit[];
    @ApiProperty({ isArray: true, required: false, type: PrizeLimit })
    @IsArray()
    @Type(() => PrizeLimit)
    prizeLimits?: PrizeLimit[];
}
