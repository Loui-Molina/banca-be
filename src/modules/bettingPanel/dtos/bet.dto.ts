import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Play } from '@database/datamodels/schemas/play';

export class BetDto {
    @ApiProperty() _id: ObjectId;
    @ApiProperty({ type: [Play] }) plays: Play[];
    @ApiProperty({ type: String }) sn: string;
    @ApiProperty({ type: Date }) date: Date;
}
