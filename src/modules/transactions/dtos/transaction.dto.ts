import { ApiProperty } from '@nestjs/swagger';
import {TransactionType} from "@database/datamodels/enums/transaction.type";
import {ObjectId} from "mongoose";

export class TransactionDto {
    @ApiProperty() _id: ObjectId;
    @ApiProperty({ type: String, enum: TransactionType }) type?: TransactionType;
    @ApiProperty() originUserId: ObjectId;
    @ApiProperty() destinationUserId: ObjectId;
    @ApiProperty({ type: Number }) amount?: number;

}
