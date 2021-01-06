import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponsePayload } from '@users/dtos/response.payload.dto';
import { AuthUserService } from '@src/modules/auth.user/auth.user.service';
import { ConstApp } from '@utils/const.app';
import { JwtPayload } from '@auth/jwt.payload.interface';
import { ResponseDto } from '@utils/dtos/response.dto';
import { Role } from '@database/datamodels/enums/role';
import { User, UserDocument } from '@src/modules/database/datamodels/schemas/user';
import { ResponseSignInDto } from './dtos/response.sign.in.dto';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { RefreshToken, RefreshTokenDocument } from '../database/datamodels/schemas/refresh.token';
import { AuthCredentialsDto } from './dtos/auth.credentials.dto';
import { TokenService } from './token.service';


@Injectable()
export class AuthService {

    private logger: Logger = new Logger(AuthService.name);

    constructor(
        private readonly configService : ConfigService,
        private userAuthService: AuthUserService,
        private jwtService: JwtService,
        private readonly tokenService : TokenService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,

    ) {}

    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<ResponseDto> {
        return this.userAuthService.singUp(authCredentialsDto).then((createdUser) => createdUser.response);
    }

    async singIn(authCredentialsDto: AuthCredentialsDto): Promise<ResponseSignInDto> {
        let responsePayload: ResponsePayload = new ResponsePayload();
        let responseSignInDto: ResponseSignInDto = new ResponseSignInDto();
        responsePayload = await this.userAuthService.validateUserPassword(authCredentialsDto);
        if (!responsePayload.userId) {
            throw new UnauthorizedException(ConstApp.INVALID_CREDENTIALS_ERROR);
        }
        const userId: string = responsePayload.userId;
        const role: Role = responsePayload.role;
        const payload: JwtPayload = { userId, role };
        const refreshToken = await this.tokenService.createRefreshToken(userId);
        const accessToken = await this.jwtService.signAsync(payload);
        responseSignInDto.accessToken = accessToken;
        responseSignInDto.expiresIn = this.configService.get<string>('TOKEN_EXPIRES');
        responseSignInDto.refreshToken = refreshToken.refreshTokenId;
        return responseSignInDto;
    }

    async getLoggedUser(user: UserDocument) {
        return await this.userModel.findById(user.id).exec();
    }
    
}
