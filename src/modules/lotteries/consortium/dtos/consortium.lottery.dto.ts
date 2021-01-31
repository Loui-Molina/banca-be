import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Days } from '@database/datamodels/enums/days';
import { Result } from '@database/datamodels/schemas/result';
import { PrizeLimit } from '@database/datamodels/schemas/prize.limit';
import { BettingLimit } from '@database/datamodels/schemas/betting.limit';
import { IsArray, IsBoolean, IsHexColor, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ConsortiumLotteryDto {
    @ApiProperty({ required: false }) @IsMongoId() @IsOptional() _id?: ObjectId;
    @ApiProperty({ required: false }) @IsArray() @IsOptional() bankings?: ObjectId[];
    @ApiProperty({
        isArray: true,
        required: false,
        type: BettingLimit,
    })
    @IsArray()
    @IsOptional()
    bettingLimits?: BettingLimit[];
    @ApiProperty({
        isArray: true,
        required: false,
        type: PrizeLimit,
    })
    @IsArray()
    @IsOptional()
    prizeLimits?: PrizeLimit[];
    @ApiProperty() @IsString() name: string;
    @ApiProperty() @IsString() nickname: string;
    @ApiProperty() @IsHexColor() color: string;
    @ApiProperty() @IsString() playTime: string;
    @ApiProperty() @IsBoolean() status: boolean;
    @ApiProperty() @IsArray() @Type(() => Result) results?: Result[];
    @ApiProperty({ required: false }) @IsArray() @IsOptional() openTime?: string;
    @ApiProperty({ required: false }) @IsArray() @IsOptional() closeTime?: string;
    @ApiProperty({ type: Number, enum: Days, isArray: true }) @IsArray() day: Days[];
}
