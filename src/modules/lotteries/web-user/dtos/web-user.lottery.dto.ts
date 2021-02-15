import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsArray, IsBoolean, IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { BettingLimitDto } from '@src/modules/database/dto/betting.limit.dto';
import { PrizeLimitDto } from '@src/modules/database/dto/prize.limit.dto';
import { ResultDto } from '@src/modules/database/dto/result.dto';
import { Days } from '@src/modules/database/datamodels/enums/days';


export class WebUserLotteryDto {
    @ApiProperty({ required: false }) @IsOptional() @IsMongoId() _id?: ObjectId;
    @ApiProperty({ required: false }) @IsOptional() @IsArray() bankings?: ObjectId[];
    @ApiProperty({
        isArray: true,
        required: false,
        type: BettingLimitDto,
    })
    @IsArray()
    @IsOptional()
    @Type(() => BettingLimitDto)
    bettingLimits?: BettingLimitDto[];
    @ApiProperty({
        isArray: true,
        required: false,
        type: PrizeLimitDto,
    })
    @IsArray()
    @IsOptional()
    @Type(() => PrizeLimitDto)
    prizeLimits?: PrizeLimitDto[];
    @ApiProperty() @IsString() name: string;
    @ApiProperty() @IsString() nickname: string;
    @ApiProperty() @IsString() color: string;
    @ApiProperty() @IsString() playTime: string;
    @ApiProperty() @IsNumber() leftTime: number;
    @ApiProperty() @IsBoolean() status: boolean;
    @ApiProperty() @IsOptional() @IsArray() @Type(() => ResultDto) results?: ResultDto[];
    @ApiProperty({ required: false }) @IsOptional() @IsString() openTime?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() closeTime?: string;
    @ApiProperty({ type: Number, enum: Days, isArray: true })
    @IsEnum(Days)
    day: Days[];
}
