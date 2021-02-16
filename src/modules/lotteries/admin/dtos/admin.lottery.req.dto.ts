import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Days } from '@database/datamodels/enums/days';
import { IsArray, IsBoolean, IsEnum, IsHexColor, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ResultDto } from '@database/dto/result.dto';

export class AdminLotteryReqDto {
    @ApiProperty({ required: false }) @IsMongoId() @IsOptional() _id?: ObjectId;
    @ApiProperty() @IsString() name: string;
    @ApiProperty() @IsString() nickname: string;
    @ApiProperty() @IsHexColor() color: string;
    @ApiProperty() @IsString() playTime: string;
    @ApiProperty() @IsBoolean() status: boolean;
    @ApiProperty() @IsArray() @IsOptional() @Type(() => ResultDto) results?: ResultDto[];
    @ApiProperty({ required: false }) @IsOptional() @IsString() openTime?: string;
    @ApiProperty({ required: false }) @IsString() @IsOptional() closeTime?: string;
    @ApiProperty({ type: Number, enum: Days, isArray: true }) @IsArray() day: Days[];
}
