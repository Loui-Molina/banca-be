import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
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
    newPassword: string;

    @ApiProperty({ type: String })
    @IsString()
    @MinLength(8)
    @MaxLength(35)
    // @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: ConstApp.PASSWORD_MESSAGE })
    verifyPassword: string;
}
