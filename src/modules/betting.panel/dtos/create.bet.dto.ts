import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Play } from '@database/datamodels/schemas/play';
import { IsArray, IsMongoId, IsOptional } from 'class-validator';

export class CreateBetDto {
    @IsMongoId()
    @IsOptional()
    @ApiProperty({ required: false })
    _id?: ObjectId;
    @ApiProperty({ type: [Play] })
    @IsArray()
    plays: Play[];
}
