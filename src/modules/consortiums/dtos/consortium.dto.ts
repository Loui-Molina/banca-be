import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class ConsortiumDto {
    @ApiProperty() creationUserId: ObjectId;
    @ApiProperty() modificationUserId: ObjectId;
    @ApiProperty() ownerUserId: ObjectId;
    @ApiProperty() _id: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() createdAt: Date;
}
