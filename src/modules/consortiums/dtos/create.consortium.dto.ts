import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { SignUpCredentialsDto } from '@auth/dtos/sign.up.credentials.dto';
import { IsBoolean, IsMongoId, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConsortiumDto {
    @ApiProperty()
    @ValidateNested()
    @Type(() => SignUpCredentialsDto)
    user: SignUpCredentialsDto;

    @ApiProperty({ required: false })
    @IsMongoId()
    @IsOptional()
    _id: ObjectId;

    @ApiProperty({ required: false })
    @IsMongoId()
    @IsOptional()
    ownerUserId?: ObjectId;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsBoolean()
    status: boolean;
}
