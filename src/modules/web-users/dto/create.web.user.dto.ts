import { ObjectId } from 'mongoose';
import { SignUpCredentialsDto } from '@auth/dtos/sign.up.credentials.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { WebUserDto } from '@web.users/dto/web.user.dto';

export class CreateWebUserDto {
    @ApiProperty() @ValidateNested() @Type(() => SignUpCredentialsDto) user: SignUpCredentialsDto;
    @ApiProperty() @IsObject() webUser: WebUserDto;
}
