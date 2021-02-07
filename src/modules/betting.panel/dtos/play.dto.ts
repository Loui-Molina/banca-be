import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Play } from '@database/datamodels/schemas/play';
import { BetStatus } from '@database/datamodels/enums/bet.status';
import { IsDate, IsMongoId, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { PlayTypes } from '@database/datamodels/enums/play.types';
import { Prop } from '@nestjs/mongoose';
import { PlayNumbers, PlayNumbersSchema } from '@database/datamodels/schemas/play.numbers';
import mongoose from 'mongoose';

export class PlayDto {
    @ApiProperty({ type: String, enum: PlayTypes }) playType?: PlayTypes;
    @ApiProperty({ type: Number }) amount?: number;
    @ApiProperty({ type: PlayNumbers })
    playNumbers: PlayNumbers;
    @ApiProperty() lotteryId?: ObjectId;
    @ApiProperty() lotteryName?: string;
}
