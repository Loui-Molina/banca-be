import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsBoolean, IsDate, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class BankingDto {
    @ApiProperty() @IsMongoId() @IsOptional() _id?: ObjectId;
    @ApiProperty() @IsString() name: string;
    @ApiProperty() @IsBoolean() @IsOptional() status?: boolean;
    @ApiProperty() @IsMongoId() @IsOptional() ownerUserId?: ObjectId;
    @ApiProperty() @IsMongoId() @IsOptional() consortiumId?: ObjectId;
    @ApiProperty() @IsString() @IsOptional() ownerUsername?: string;
    @ApiProperty() @IsString() @IsOptional() ownerName?: string;
    @ApiProperty() @IsDate() @IsOptional() createdAt?: Date;
    @ApiProperty() @IsDate() @IsOptional() startOfOperation?: Date;
    @ApiProperty() @IsBoolean() @IsOptional() showPercentage?: boolean;
    @ApiProperty() @IsNumber() @IsOptional() earningPercentage?: number;
}
