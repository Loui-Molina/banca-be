import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { TransactionObjects } from 'src/modules/database/datamodels/enums/transaction.objects';
import { TransactionType } from 'src/modules/database/datamodels/enums/transaction.type';

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
