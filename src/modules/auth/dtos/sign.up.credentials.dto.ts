import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@database/datamodels/enums/role';
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpCredentialsDto {
    @ApiProperty({ type: String })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @ApiProperty({ type: String })
    @IsString()
    @MinLength(8)
    @MaxLength(35)
    @IsOptional() // Solo para el edit
    // @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: ConstApp.PASSWORD_MESSAGE })
    password: string;

    @ApiProperty({ type: String, required: true })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ type: String, enum: Role, required: false })
    @IsEnum(Role)
    @IsString()
    @IsOptional()
    role: Role;
}
