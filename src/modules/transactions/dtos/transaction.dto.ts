import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@database/datamodels/enums/transaction.type';
import { ObjectId } from 'mongoose';
import { TransactionObjects } from '@database/datamodels/enums/transaction.objects';

export class TransactionDto {
    @ApiProperty({ required: false }) _id?: ObjectId;
    @ApiProperty({ type: String, enum: TransactionType, required: false }) type?: TransactionType;
    @ApiProperty() originId: ObjectId;
    @ApiProperty() destinationId: ObjectId;
    @ApiProperty() createdAt: Date;
    @ApiProperty({ type: Number }) amount: number;
    @ApiProperty({ type: Number }) actualBalance: number;
    @ApiProperty({ type: Number }) lastBalance: number;
    @ApiProperty({ type: String, enum: TransactionObjects }) originObject: TransactionObjects;
    @ApiProperty() originName: string;
    @ApiProperty({ type: String, enum: TransactionObjects }) destinationObject: TransactionObjects;
    @ApiProperty() destinationName: string;
}
