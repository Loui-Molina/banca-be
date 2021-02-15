import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsArray, IsMongoId, IsOptional } from 'class-validator';
import { Play } from '@src/modules/database/datamodels/schemas/play';

export class CreateBetDto {
    @IsMongoId()
    @IsOptional()
    @ApiProperty({ required: false })
    _id?: ObjectId;
    @ApiProperty({ type: [Play] })
    @IsArray()
    plays: Play[];
}
