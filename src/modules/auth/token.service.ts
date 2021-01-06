import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { RefreshTokenRequestDto } from "./dtos/refresh.token.request.dto";
import { ResponseSignInDto } from "./dtos/response.sign.in.dto";
import { JwtPayload } from "./jwt.payload.interface";
import { verify } from 'jsonwebtoken';
import { ConfigService } from "@nestjs/config";
import { RefreshToken, RefreshTokenDocument } from "../database/datamodels/schemas/refresh.token";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConstApp } from "../utils/const.app";
import { randomBytes } from "crypto";

@Injectable()
export class TokenService{

  private logger: Logger = new Logger(TokenService.name);

    constructor(
        private readonly configService:ConfigService,
        @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshTokenDocument>,
    ){}

    async getRefreshToken(oldAccessToken:string, refreshToken:RefreshTokenRequestDto): Promise<ResponseSignInDto>{
        const oldPayload =  await this.validateToken(oldAccessToken, true);
        console.log("OldPayload "+oldPayload);

        return new ResponseSignInDto();
    }

    private async validateToken(
        token: string,
        ignoreExpiration: boolean = false,
      ): Promise<JwtPayload> {
        return verify(token, this.configService.get<string>(process.env.TOKEN_SECRET_KEY), {
          ignoreExpiration,
        }) as JwtPayload;
      }
      
    async createRefreshToken(userId:string){
       
        try{
            const refreshTokenModel = await this.refreshTokenModel.findOne({userId}).exec();
            const value = randomBytes(64).toString('hex');
            refreshTokenModel.refreshTokenId = value;
            return  refreshTokenModel.save();
        }catch(error){
            this.logger.error(ConstApp.REFRESH_TOKEN_ERROR + error);
            throw new InternalServerErrorException(ConstApp.REFRESH_TOKEN_ERROR);
        }
    }
}