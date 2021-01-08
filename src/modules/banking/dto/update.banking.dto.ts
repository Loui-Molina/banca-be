import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Languages } from '@database/datamodels/enums/languages';

export class UpdateBankingDto {
    @ApiProperty({ required: false }) _id: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() status: boolean;
    @ApiProperty({ required: false }) ownerUserId: ObjectId;
    @ApiProperty() showPercentage: boolean;
    @ApiProperty() selectedConsortium: ObjectId;
}
