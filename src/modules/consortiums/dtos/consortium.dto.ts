import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Banking } from '@database/datamodels/schemas/banking';
import { IsArray, IsBoolean, IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';

export class ConsortiumDto {
    @ApiProperty() @IsString() ownerName: string;
    @ApiProperty() @IsString() ownerUsername: string;
    @ApiProperty() @IsMongoId() ownerId: ObjectId;
    @ApiProperty() @IsMongoId() _id: ObjectId;
    @ApiProperty() @IsString() name: string;
    @ApiProperty() @IsDate() createdAt: Date;
    @ApiProperty() @IsBoolean() status: boolean;
    @ApiProperty() @IsDate() firstTransactionDate: Date;
    @ApiProperty() @IsArray() @IsOptional() bankings?: Banking[];
}
