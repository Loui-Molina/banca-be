import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Days } from '@database/datamodels/enums/days';
import { IsArray, IsBoolean, IsEnum, IsHexColor, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { BettingLimitDto } from '@database/dto/betting.limit.dto';
import { PrizeLimitDto } from '@database/dto/prize.limit.dto';
import { ResultDto } from '@database/dto/result.dto';
import { BlockedNumberDto } from '@database/dto/blocked.number.dto';

export class ConsortiumLotteryDto {
    @ApiProperty({ required: false }) @IsMongoId() @IsOptional() _id?: ObjectId;
    @ApiProperty({ required: false }) @IsArray() @IsOptional() bankings?: ObjectId[];
    @ApiProperty({
        isArray: true,
        required: false,
        type: BettingLimitDto,
    })
    @IsArray()
    @IsOptional()
    bettingLimits?: BettingLimitDto[];
    @ApiProperty({
        isArray: true,
        required: false,
        type: PrizeLimitDto,
    })
    @IsArray()
    @IsOptional()
    prizeLimits?: PrizeLimitDto[];
    @ApiProperty() @IsString() name: string;
    @ApiProperty() @IsString() nickname: string;
    @ApiProperty() @IsHexColor() color: string;
    @ApiProperty() @IsString() playTime: string;
    @ApiProperty() @IsBoolean() status: boolean;
    @ApiProperty() @IsArray() @Type(() => ResultDto) results?: ResultDto[];
    @ApiProperty({ required: false }) @IsArray() @IsOptional() openTime?: string;
    @ApiProperty({ required: false }) @IsArray() @IsOptional() closeTime?: string;
    @ApiProperty({ type: Number, enum: Days, isArray: true }) @IsEnum(Days) day: Days[];
    @ApiProperty({ type: Number, enum: Days, isArray: true }) @IsArray() blockedNumbers: BlockedNumberDto[];
}
