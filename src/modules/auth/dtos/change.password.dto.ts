import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ObjectId } from 'mongoose';

export class ChangePasswordDto {
    @ApiProperty()
    @IsMongoId()
    _id: ObjectId;

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
