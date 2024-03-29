import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Banking } from '@database/datamodels/schemas/banking';

export class ConsortiumDto {
    @ApiProperty() ownerName: string;
    @ApiProperty() ownerUsername: string;
    @ApiProperty() ownerId: ObjectId;
    @ApiProperty() _id: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() createdAt: Date;
    @ApiProperty() status: boolean;
    @ApiProperty() firstTransactionDate: Date;
    @ApiProperty() bankings?: Banking[];
}
