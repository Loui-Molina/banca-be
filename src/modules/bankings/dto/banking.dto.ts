import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import {IsArray, IsBoolean, IsDate, IsEnum, IsMongoId, IsNumber, IsObject, IsOptional, IsString} from 'class-validator';
import {PlayTypes} from "@database/datamodels/enums/play.types";
import {BankingPercentage} from "@database/datamodels/schemas/banking.percentage";
import {PlayNumbersDto} from "@database/dto/play.numbers.dto";

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
    @ApiProperty({ type: [BankingPercentage] })
    @IsArray()
    bankingPercentage: BankingPercentage[];
    @ApiProperty() @IsNumber() @IsOptional() cancellationTime?: number;
    @ApiProperty() @IsString() header: string;
    @ApiProperty() @IsString() footer: string;
}
