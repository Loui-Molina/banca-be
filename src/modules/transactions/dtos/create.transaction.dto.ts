import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@database/datamodels/enums/transaction.type';
import { ObjectId } from 'mongoose';
import { TransactionObjects } from '@database/datamodels/enums/transaction.objects';

export class CreateTransactionDto {
    @ApiProperty({ required: false }) _id?: ObjectId;
    @ApiProperty({ type: String, enum: TransactionType, required: false }) type?: TransactionType;
    @ApiProperty() originId: ObjectId;
    @ApiProperty() destinationId: ObjectId;
    @ApiProperty({ type: Number }) amount: number;
    @ApiProperty({ type: String }) description: string;
    @ApiProperty({ type: String, enum: TransactionObjects }) originObject: TransactionObjects;
    @ApiProperty({ type: String, enum: TransactionObjects }) destinationObject: TransactionObjects;
}
