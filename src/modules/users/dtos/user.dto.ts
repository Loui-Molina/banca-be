import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/modules/database/datamodels/enums/role';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
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
