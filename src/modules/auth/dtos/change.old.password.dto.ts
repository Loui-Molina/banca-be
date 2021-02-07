import { ApiProperty } from '@nestjs/swagger';
import { ConstApp } from '@utils/const.app';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ChangeOldPasswordDto {
    @ApiProperty({ type: String })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @ApiProperty({ type: String })
    @IsString()
    @MinLength(8)
    @MaxLength(35)
    //@Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: ConstApp.PASSWORD_MESSAGE })
    oldPassword: string;

    @ApiProperty({ type: String })
    @IsString()
    @MinLength(8)
    @MaxLength(35)
    //@Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: ConstApp.PASSWORD_MESSAGE })
    newPassword: string;

    @ApiProperty({ type: String })
    @IsString()
    @MinLength(8)
    @MaxLength(35)
    //@Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: ConstApp.PASSWORD_MESSAGE })
    verifyPassword: string;
}