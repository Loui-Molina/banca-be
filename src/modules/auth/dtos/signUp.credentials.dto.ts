import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@src/modules/database/datamodels/enums/role';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

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
    // @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: ConstApp.PASSWORD_MESSAGE })
    password: string;

    @ApiProperty({ type: String, required: true })
    @IsString()
    name: string;

    @ApiProperty({ type: String, enum: Role, required: false })
    role: Role;
}
