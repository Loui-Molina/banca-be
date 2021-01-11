import { forwardRef, Inject, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { randomBytes } from "crypto";
import { Model } from "mongoose";
import { ResponseSignInDto } from "@auth/dtos/response.sign.in.dto";
import { RefreshToken, RefreshTokenDocument } from "@database/datamodels/schemas/refresh.token";
import { ConstApp } from "@utils/const.app";
import { JwtPayloadRefresh } from "@src/modules/auth/jwt.payload.refresh.interface";
import { UserDocument } from "@database/datamodels/schemas/user";
import { AuthUserService } from "@auth.user/auth.user.service";
import { ResponsePayload } from "@users/dtos/response.payload.dto";
import { AuthService } from "@auth/auth.service";

@Injectable()
export class TokenService{

  private logger: Logger = new Logger(TokenService.name);

    constructor(
        private readonly configService:ConfigService,
        private readonly userAuthService: AuthUserService,
        @Inject(forwardRef(() => AuthService))
        private readonly authService : AuthService,
        @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshTokenDocument>,

    ){}

    async getRefreshToken(ipAdress:string ,refreshToken:RefreshToken): Promise<ResponseSignInDto>{
        if(ipAdress === refreshToken.ipAddress){
            let user:UserDocument = await this.userAuthService.getUserRefresh(refreshToken.userId);
            if(!user){
              throw new InternalServerErrorException();
            }
            let responsePayload:ResponsePayload= new ResponsePayload();
            responsePayload.role= user.role;
            responsePayload.userId = user._id;
            let responseSignInDto:ResponseSignInDto= await this.authService.getToken(responsePayload, ipAdress)
            this.logger.debug("User "+ user);
            return responseSignInDto;
        }
        else{
          throw new UnauthorizedException();
        }
    }

    async createRefreshToken(userIp:string , userId:string):Promise<JwtPayloadRefresh> {
       
        try{
            const refreshTokenModel = await this.refreshTokenModel.findOne({userId}).exec();
            const value = randomBytes(64).toString('hex');
            refreshTokenModel.refreshTokenId = value;
            refreshTokenModel.ipAddress = userIp;
            await refreshTokenModel.save();
            const jwtPayloadRefresh:JwtPayloadRefresh = { value,userId}
            return jwtPayloadRefresh;
        }catch(error){
            this.logger.error(ConstApp.REFRESH_TOKEN_ERROR + error);
            throw new InternalServerErrorException(ConstApp.REFRESH_TOKEN_ERROR);
        }
    }

    async deleteRefreshToken(ipAddress:string,user:UserDocument){
        const userId:string = user._id;
        let refreshTokenUpdated = await this.refreshTokenModel.findOneAndUpdate({userId}, { refreshTokenId:'', ipAddress:''})
        this.logger.debug("User "+ user);
        this.logger.debug("Refresh token updated "+ refreshTokenUpdated);
    }

}