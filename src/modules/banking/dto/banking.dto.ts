import { Languages } from '@database/datamodels/enums/languages';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export class BankingDto {
    @ApiProperty() _id?: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() status?: boolean;
    @ApiProperty() ownerUserId?: ObjectId;
    @ApiProperty() consortiumId?: ObjectId;
    @ApiProperty() ownerUsername?: string;
    @ApiProperty() createdAt?: Date;
    @ApiProperty() startOfOperation?: Date;
    @ApiProperty() showPercentage?: boolean;
}
