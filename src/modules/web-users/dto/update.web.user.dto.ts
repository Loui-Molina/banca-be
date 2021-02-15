import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { SignUpCredentialsDto } from 'src/modules/auth/dtos/sign.up.credentials.dto';
import { WebUserDto } from './web.user.dto';

export class UpdateWebUserDto {
    @ApiProperty() @ValidateNested() @Type(() => SignUpCredentialsDto) user: SignUpCredentialsDto;
    @ApiProperty() @IsObject() webUser: WebUserDto;
    @ApiProperty() @IsMongoId() @IsOptional() _id?: ObjectId;
}
