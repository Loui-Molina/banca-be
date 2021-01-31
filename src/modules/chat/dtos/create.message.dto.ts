import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
    @IsOptional() @IsMongoId() @ApiProperty({ required: false }) destinationId?: ObjectId;
    @IsString() @ApiProperty({ required: true }) message: string;
}
