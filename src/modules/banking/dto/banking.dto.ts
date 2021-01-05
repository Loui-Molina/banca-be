import { Languages } from '@database/datamodels/enums/languages';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class BankingDto {
    @ApiProperty() _id?: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() status?: boolean;
    @ApiProperty() ownerUserId?: ObjectId;
    @ApiProperty() ownerUsername?: string;
    @ApiProperty() creationDate?: Date;
    @ApiProperty() startOfOperation?: Date;
    @ApiProperty() showPercentage?: boolean;
    @ApiProperty() language?: Languages;
    @ApiProperty() selectedConsortium?: ObjectId;
}
