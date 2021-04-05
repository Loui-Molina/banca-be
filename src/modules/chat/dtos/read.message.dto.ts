import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class ReadMessageDto {
    @IsOptional() @IsMongoId() originId?: ObjectId;
}
