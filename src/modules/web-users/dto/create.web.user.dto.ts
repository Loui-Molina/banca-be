
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { WebUserDto } from './web.user.dto';
import { SignUpCredentialsDto } from 'src/modules/auth/dtos/sign.up.credentials.dto';


export class CreateWebUserDto {
    @ApiProperty() @ValidateNested() @Type(() => SignUpCredentialsDto) user: SignUpCredentialsDto;
    @ApiProperty() @IsObject() webUser: WebUserDto;
}
