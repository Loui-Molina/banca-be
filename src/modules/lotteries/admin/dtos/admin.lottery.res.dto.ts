import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Days } from '@database/datamodels/enums/days';
import { Result } from '@database/datamodels/schemas/result';
import { Lottery } from '@database/datamodels/schemas/lottery';
import { IsArray, IsBoolean, IsHexColor, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ResultDto } from '@database/dto/result.dto';

export class AdminLotteryResDto extends PartialType(Lottery) {
    @ApiProperty({ required: false }) @IsMongoId() @IsOptional() _id?: ObjectId;
    @ApiProperty() @IsString() name: string;
    @ApiProperty() @IsString() nickname: string;
    @ApiProperty() @IsHexColor() color: string;
    @ApiProperty() @IsString() playTime: string;
    @ApiProperty() @IsBoolean() status: boolean;
    @ApiProperty({ type: ResultDto, isArray: true })
    @IsOptional()
    @IsArray()
    @Type(() => ResultDto)
    results?: Result[];
    @ApiProperty({ required: false }) @IsString() @IsOptional() openTime?: string;
    @ApiProperty({ required: false }) @IsString() @IsOptional() closeTime?: string;
    @ApiProperty({ type: Number, enum: Days, isArray: true }) @IsArray() day: Days[];
}
