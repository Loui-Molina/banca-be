import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

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
