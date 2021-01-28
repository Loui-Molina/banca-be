import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Play } from '@database/datamodels/schemas/play';
import { BetStatus } from '@database/datamodels/enums/bet.status';

export class BetDto {
    @ApiProperty() _id: ObjectId;
    @ApiProperty({ type: [Play] }) plays: Play[];
    @ApiProperty({ type: String }) sn: string;
    @ApiProperty({ type: Date }) date: Date;
    @ApiProperty({ type: String, enum: BetStatus }) betStatus?: BetStatus;
}
