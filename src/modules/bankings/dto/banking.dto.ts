import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsBoolean, IsDate, IsNumber, IsObject, IsString } from 'class-validator';

export class BankingDto {
    @ApiProperty() @IsObject() _id?: ObjectId;
    @ApiProperty() @IsString() name: string;
    @ApiProperty() @IsBoolean() status?: boolean;
    @ApiProperty() @IsObject() ownerUserId?: ObjectId;
    @ApiProperty() @IsObject() consortiumId?: ObjectId;
    @ApiProperty() @IsString() ownerUsername?: string;
    @ApiProperty() @IsString() ownerName?: string;
    @ApiProperty() @IsDate() createdAt?: Date;
    @ApiProperty() @IsDate() startOfOperation?: Date;
    @ApiProperty() @IsBoolean() showPercentage?: boolean;
    @ApiProperty() @IsNumber() earningPercentage?: number;
}
