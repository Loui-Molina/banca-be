import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@database/datamodels/enums/transaction.type';
import { ObjectId } from 'mongoose';
import { TransactionObjects } from '@database/datamodels/enums/transaction.objects';
import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
    @ApiProperty({ required: false }) @IsMongoId() @IsOptional() _id?: ObjectId;
    @ApiProperty({
        type: String,
        enum: TransactionType,
        required: false,
    })
    @IsEnum(TransactionType)
    @IsOptional()
    type?: TransactionType;
    @ApiProperty() @IsMongoId() originId: ObjectId;
    @ApiProperty() @IsMongoId() destinationId: ObjectId;
    @ApiProperty({ type: Number }) @IsNumber() amount: number;
    @ApiProperty({ type: String }) @IsString() description: string;
    @ApiProperty({
        type: String,
        enum: TransactionObjects,
    })
    @IsEnum(TransactionObjects)
    originObject: TransactionObjects;
    @ApiProperty({
        type: String,
        enum: TransactionObjects,
    })
    @IsEnum(TransactionObjects)
    destinationObject: TransactionObjects;
}
