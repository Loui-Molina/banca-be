import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Play, PlaySchema } from '@database/datamodels/schemas/play';
import { Prop } from '@nestjs/mongoose';
import { IsMongoId, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PlayBetDto } from '@betting.panel/dtos/play.bet.dto';

export class CreateBetDto {
    @IsMongoId()
    @IsOptional()
    @ApiProperty({ required: false })
    _id: ObjectId;
    @ApiProperty({ type: [Play] })
    plays: Play[];
}
