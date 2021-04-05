import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
    @IsOptional() @IsMongoId() destinationId?: ObjectId;
    @IsString() message: string;
}
