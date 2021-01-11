import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBankingDto {
    @ApiProperty({ required: true }) _id: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() status: boolean;
    @ApiProperty({ required: false }) ownerUserId: ObjectId;
    @ApiProperty() showPercentage: boolean;
    @ApiProperty() selectedConsortium: ObjectId;
}
