import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsMongoId } from 'class-validator';

export class UpdateBetDto {
    @ApiProperty({ required: false }) @IsMongoId() _id: ObjectId;
}
