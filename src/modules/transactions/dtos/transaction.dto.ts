import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@database/datamodels/enums/transaction.type';
import { ObjectId } from 'mongoose';
import { TransactionObjects } from '@database/datamodels/enums/transaction.objects';
import { Prop } from '@nestjs/mongoose';
import { IsDate, IsEnum, IsMongoId, IsNumber, IsString } from 'class-validator';
import { Role } from '@database/datamodels/enums/role';

export class TransactionDto {
    @IsMongoId()
    @ApiProperty({ required: false })
    _id?: ObjectId;
    @IsEnum(TransactionType)
    @ApiProperty({ type: String, enum: TransactionType, required: false })
    type?: TransactionType;
    @IsMongoId()
    @ApiProperty()
    originId: ObjectId;
    @IsMongoId()
    @ApiProperty()
    destinationId: ObjectId;
    @IsDate()
    @ApiProperty()
    createdAt: Date;
    @IsNumber()
    @ApiProperty({ type: Number })
    amount: number;
    @IsNumber()
    @ApiProperty({ type: Number })
    actualBalance: number;
    @IsNumber()
    @ApiProperty({ type: Number })
    lastBalance: number;
    @IsEnum(TransactionObjects)
    @ApiProperty({ type: String, enum: TransactionObjects })
    originObject: TransactionObjects;
    @IsString()
    @ApiProperty()
    originName: string;
    @IsEnum(TransactionObjects)
    @ApiProperty({ type: String, enum: TransactionObjects })
    destinationObject: TransactionObjects;
    @IsString()
    @ApiProperty()
    destinationName: string;
    @IsString()
    @ApiProperty()
    description?: string;
}
