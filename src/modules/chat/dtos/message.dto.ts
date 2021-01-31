import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import {IsBoolean, IsDate, IsMongoId, IsString} from 'class-validator';

export class MessageDto {
    @IsMongoId() @ApiProperty() _id: ObjectId;
    @IsMongoId() @ApiProperty() originId: ObjectId;
    @IsMongoId() @ApiProperty() destinationId: ObjectId;
    @IsString() @ApiProperty() message: string;
    @IsString() @ApiProperty() destinationName?: string;
    @IsString() @ApiProperty() originName?: string;
    @IsBoolean() @ApiProperty() sender?: boolean;
    @IsDate() @ApiProperty() date: Date;
}
