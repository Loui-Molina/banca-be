import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Days } from '@database/datamodels/enums/days';
import { Result } from '@database/datamodels/schemas/result';
import { PrizeLimit } from '@database/datamodels/schemas/prize.limit';
import { BettingLimit } from '@database/datamodels/schemas/betting.limit';
import { IsArray, IsBoolean, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class BankingLotteryDto {
    @ApiProperty({ required: false }) @IsOptional() @IsMongoId() _id?: ObjectId;
    @ApiProperty({ required: false }) @IsOptional() @IsArray() bankings?: ObjectId[];
    @ApiProperty({
        isArray: true,
        required: false,
        type: BettingLimit,
    })
    @IsArray()
    @IsOptional()
    @Type(() => BettingLimit)
    bettingLimits?: BettingLimit[];
    @ApiProperty({
        isArray: true,
        required: false,
        type: PrizeLimit,
    })
    @IsArray()
    @IsOptional()
    @Type(() => PrizeLimit)
    prizeLimits?: PrizeLimit[];
    @ApiProperty() @IsString() name: string;
    @ApiProperty() @IsString() nickname: string;
    @ApiProperty() @IsString() color: string;
    @ApiProperty() @IsString() playTime: string;
    @ApiProperty() @IsNumber() leftTime: number;
    @ApiProperty() @IsBoolean() status: boolean;
    @ApiProperty() @IsOptional() @IsArray() @Type(() => Result) results?: Result[];
    @ApiProperty({ required: false }) @IsOptional() @IsString() openTime?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() closeTime?: string;
    @ApiProperty({ type: Number, enum: Days, isArray: true })
    @IsArray()
    day: Days[];
}
