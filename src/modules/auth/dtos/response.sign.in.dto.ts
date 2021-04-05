import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsString } from 'class-validator';

export class ResponseSignInDto {
    @ApiProperty()
    @IsJWT()
    accessToken: string;

    @ApiProperty()
    @IsString()
    expiresIn: string;

    @ApiProperty()
    @IsJWT()
    refreshToken: string;
}
