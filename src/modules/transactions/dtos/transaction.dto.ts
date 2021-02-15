import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsDate, IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { TransactionObjects } from 'src/modules/database/datamodels/enums/transaction.objects';
import { TransactionType } from 'src/modules/database/datamodels/enums/transaction.type';

export class TransactionDto {
    @ApiProperty({ required: false })
    @IsMongoId()
    @IsOptional()
    _id?: ObjectId;
    @ApiProperty({ type: String, enum: TransactionType, required: false })
    @IsEnum(TransactionType)
    @IsOptional()
    type?: TransactionType;
    @ApiProperty()
    @IsMongoId()
    originId: ObjectId;
    @ApiProperty()
    @IsMongoId()
    destinationId: ObjectId;
    @ApiProperty()
    @IsDate()
    createdAt: Date;
    @ApiProperty({ type: Number })
    @IsNumber()
    amount: number;
    @ApiProperty({ type: Number })
    @IsNumber()
    actualBalance: number;
    @ApiProperty({ type: Number })
    @IsNumber()
    lastBalance: number;
    @ApiProperty({ type: String, enum: TransactionObjects })
    @IsEnum(TransactionObjects)
    originObject: TransactionObjects;
    @ApiProperty()
    @IsString()
    originName: string;
    @ApiProperty({ type: String, enum: TransactionObjects })
    @IsEnum(TransactionObjects)
    destinationObject: TransactionObjects;
    @ApiProperty()
    @IsString()
    destinationName: string;
    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;
}
