import { Injectable } from "@nestjs/common";
import { RefreshTokenRequestDto } from "./dtos/refresh.token.request.dto";
import { ResponseSignInDto } from "./dtos/response.sign.in.dto";

@Injectable()
export class TokenService{

    async getRefreshToken(refreshToken:RefreshTokenRequestDto): Promise<ResponseSignInDto>{

        return new ResponseSignInDto();
    }
}