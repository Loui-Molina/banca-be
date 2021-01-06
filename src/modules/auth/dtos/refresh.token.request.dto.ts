import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenRequestDto{

    @ApiProperty()
    oldAccessToken:string;

    @ApiProperty()
    refreshToken:string;

}