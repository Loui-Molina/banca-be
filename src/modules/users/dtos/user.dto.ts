import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@database/datamodels/enums/role';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ChangePasswordDto } from '@auth/dtos/change.password.dto';
import { Type } from 'class-transformer';

export class UserDto {
    @ApiProperty({ type: String })
    @IsString()
    _id: string;
    @ApiProperty({ type: String })
    @IsString()
    name: string;
    @ApiProperty({ type: String })
    @IsString()
    @IsOptional()
    username?: string;
    @ApiProperty({ type: String, enum: Role })
    @IsEnum(Role)
    role?: Role;
}
