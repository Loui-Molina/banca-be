import { ApiProperty } from '@nestjs/swagger';
import { SignUpCredentialsDto } from '@auth/dtos/sign.up.credentials.dto';
import { IsMongoId, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { WebUserDto } from '@web.users/dto/web.user.dto';
import { ObjectId } from 'mongoose';

export class UpdateWebUserDto {
    @ApiProperty() @ValidateNested() @Type(() => SignUpCredentialsDto) user: SignUpCredentialsDto;
    @ApiProperty() @IsObject() webUser: WebUserDto;
    @ApiProperty() @IsMongoId() @IsOptional() _id?: ObjectId;
}
