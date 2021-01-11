import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class BetDto {
    @ApiProperty() _id: ObjectId;
}
