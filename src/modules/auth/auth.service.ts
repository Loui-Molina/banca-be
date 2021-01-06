import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponsePayload } from '@users/dtos/response.payload.dto';
import { AuthUserService } from '@src/modules/auth.user/auth.user.service';
import { ConstApp } from '@utils/const.app';
import { AuthCredentialsDto } from '@auth/dtos/auth.credentials.dto';
import { JwtPayload } from '@auth/jwt.payload.interface';
import { ResponseDto } from '@utils/dtos/response.dto';
import { Role } from '@database/datamodels/enums/role';
import { User, UserDocument } from '@src/modules/database/datamodels/schemas/user';
import { ResponseSignInDto } from './dtos/response.sign.in.dto';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { RefreshToken, RefreshTokenDocument } from '../database/datamodels/schemas/refresh.token';
import { RefreshTokenRequestDto } from './dtos/refresh.token.request.dto';


@Injectable()
export class AuthService {

    private logger: Logger = new Logger(AuthService.name);

    constructor(
        private readonly configService : ConfigService,
        private userAuthService: AuthUserService,
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshTokenDocument>,
    ) {}

    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<ResponseDto> {
        return this.userAuthService.singUp(authCredentialsDto).then((createdUser) => createdUser.response);
    }

    async singIn(authCredentialsDto: AuthCredentialsDto): Promise<ResponseSignInDto> {
        let responsePayload: ResponsePayload = new ResponsePayload();
        let responseSignInDto: ResponseSignInDto = new ResponseSignInDto();
        responsePayload = await this.userAuthService.validateUserPassword(authCredentialsDto);
        if (!responsePayload.username) {
            throw new UnauthorizedException(ConstApp.INVALID_CREDENTIALS_ERROR);
        }
        const username: string = responsePayload.username;
        const role: Role = responsePayload.role;
        const payload: JwtPayload = { username, role };
        const refreshToken = await this.createRefreshToken();
        const accessToken = await this.jwtService.signAsync(payload);
        responseSignInDto.accessToken = accessToken;
        responseSignInDto.expiresIn = this.configService.get<string>('TOKEN_EXPIRES');
        responseSignInDto.refreshToken = refreshToken.refreshTokenId;
        return responseSignInDto;
    }

    async getLoggedUser(user: UserDocument) {
        return await this.userModel.findById(user.id).exec();
    }
    
    async createRefreshToken(){
       
        try{
            const refreshTokenModel = new this.refreshTokenModel();
            const value = randomBytes(64).toString('hex');
            refreshTokenModel.refreshTokenId = value;
            return  refreshTokenModel.save();
        }catch(error){
            this.logger.error(ConstApp.REFRESH_TOKEN_ERROR + error);
            throw new InternalServerErrorException(ConstApp.REFRESH_TOKEN_ERROR);
        }
    }

}
