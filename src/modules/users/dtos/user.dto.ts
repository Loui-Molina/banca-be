import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@database/datamodels/enums/role';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ChangePasswordDto } from '@auth/dtos/change.password.dto';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class UserDto {
    @ApiProperty({ type: String })
    @IsMongoId()
    _id: ObjectId;
    @ApiProperty({ type: String })
    @IsString()
    @IsOptional()
    name: string;
    @ApiProperty({ type: String })
    @IsString()
    @IsOptional()
    username?: string;
    @ApiProperty({ type: String, enum: Role })
    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}
