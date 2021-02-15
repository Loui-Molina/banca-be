import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsArray, IsBoolean, IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';
import { BankingDto } from '@src/modules/database/dto/banking.dto';

export class ConsortiumDto {
    @ApiProperty() @IsString() ownerName: string;
    @ApiProperty() @IsString() ownerUsername: string;
    @ApiProperty() @IsMongoId() ownerId: ObjectId;
    @ApiProperty() @IsMongoId() _id: ObjectId;
    @ApiProperty() @IsString() name: string;
    @ApiProperty() @IsDate() createdAt: Date;
    @ApiProperty() @IsBoolean() status: boolean;
    @ApiProperty() @IsDate() startOfOperation: Date;
    @ApiProperty() @IsArray() @IsOptional() bankings?: BankingDto[];
}
