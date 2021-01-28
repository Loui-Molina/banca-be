import { ApiProperty } from '@nestjs/swagger';

export class ResponseSignInDto {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    expiresIn: string;

    @ApiProperty()
    refreshToken: string;
}
