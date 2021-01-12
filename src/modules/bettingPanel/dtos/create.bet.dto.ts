import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateBetDto {
    @ApiProperty({ required: false }) _id: ObjectId;
}
