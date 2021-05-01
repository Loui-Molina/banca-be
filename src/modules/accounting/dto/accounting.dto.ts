import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class AccountingDto {
    @ApiProperty() @IsOptional() @IsMongoId() bankingId?: ObjectId;
    @ApiProperty() @IsOptional() @IsMongoId() weekId?: ObjectId;
    @ApiProperty({ required: false }) @IsOptional() week?: Date;
    @ApiProperty({ required: false }) @IsOptional() @IsBoolean() isPayed?: boolean;
    @ApiProperty({ required: false }) @IsOptional() @IsString() banking?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() consortium?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsNumber() dueBalance?: number;
    @ApiProperty({ required: false }) @IsOptional() @IsNumber() percentage?: number;
}
