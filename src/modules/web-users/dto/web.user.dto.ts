import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsBoolean, IsDate, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class WebUserDto {
    @ApiProperty() @IsMongoId() @IsOptional() _id?: ObjectId;
    @ApiProperty() @IsBoolean() @IsOptional() status?: boolean;
    @ApiProperty() @IsMongoId() @IsOptional() ownerUserId?: ObjectId;
    @ApiProperty() @IsMongoId() @IsOptional() bankingId?: ObjectId;
    @ApiProperty() @IsString() @IsOptional() ownerUsername?: string;
    @ApiProperty() @IsString() @IsOptional() ownerName?: string;
    @ApiProperty() @IsDate() @IsOptional() createdAt?: Date;
    @ApiProperty() @IsDate() @IsOptional() startOfOperation?: Date;
}
