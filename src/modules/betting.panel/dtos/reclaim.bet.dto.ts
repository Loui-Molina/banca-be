import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Play, PlaySchema } from '@database/datamodels/schemas/play';
import { Prop } from '@nestjs/mongoose';
import { BetStatus } from '@database/datamodels/enums/bet.status';

export class ReclaimBetDto {
    @ApiProperty({ required: true }) sn: string;
}
