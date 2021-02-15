import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AuthUserService } from '../auth.user/auth.user.service';
import { Role } from '../database/datamodels/enums/role';
import { Banking } from '../database/datamodels/schemas/banking';
import { Consortium } from '../database/datamodels/schemas/consortium';
import { User } from '../database/datamodels/schemas/user';
import { WebUser } from '../database/datamodels/schemas/web.user';
import { ResponsePayload } from '../users/dtos/response.payload.dto';
import { ConstApp } from '../utils/const.app';
import { ResponseDto } from '../utils/dtos/response.dto';
import { ResponseSignInDto } from './dtos/response.sign.in.dto';
import { SignInCredentialsDto } from './dtos/sign.in.credentials.dto';
import { SignUpCredentialsDto } from './dtos/sign.up.credentials.dto';
import { JwtPayload } from './jwt.payload.interface';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
    private logger: Logger = new Logger(AuthService.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly userAuthService: AuthUserService,
        private readonly jwtService: JwtService,
        private readonly tokenService: TokenService,
        @InjectModel(Banking.name) private readonly bankingModel: Model<Banking>,
        @InjectModel(Consortium.name) private readonly consortiumModel: Model<Consortium>,
        @InjectModel(WebUser.name) private readonly webUserModel: Model<WebUser>,
    ) {}

    async signUp(signUpCredentialsDto: SignUpCredentialsDto, user: User): Promise<ResponseDto> {
        return this.userAuthService.signUp(signUpCredentialsDto, user).then((createdUser) => createdUser.response);
    }

    async signIn(userIp: string, signInCredentialsDto: SignInCredentialsDto): Promise<ResponseSignInDto> {
        const responsePayload: ResponsePayload = await this.userAuthService.validateUserPassword(signInCredentialsDto);
        let responseSignInDto: ResponseSignInDto = new ResponseSignInDto();
        if (!responsePayload.userId) {
            throw new UnauthorizedException(ConstApp.INVALID_CREDENTIALS_ERROR);
        }
        await this.verifyStatus(responsePayload);
        responseSignInDto = await this.getToken(responsePayload, userIp, false);

        return responseSignInDto;
    }

    async verifyStatus(responsePayload: ResponsePayload) {
        const user = await this.userAuthService.getUser(responsePayload.userId);
        switch (user.role) {
            case Role.consortium:
                // eslint-disable-next-line no-case-declarations
                const consortiums = await this.consortiumModel.findOne({ ownerUserId: user._id });
                if (consortiums.status === false) {
                    throw new UnauthorizedException(ConstApp.CANNOT_LOGIN);
                }
                break;
            case Role.banker:
                // eslint-disable-next-line no-case-declarations
                const banking = await this.bankingModel.findOne({ ownerUserId: user._id });
                // eslint-disable-next-line no-case-declarations
                const bankingConsortium = await this.consortiumModel.findOne({ _id: banking.consortiumId });
                if (banking.status === false || bankingConsortium.status === false) {
                    throw new UnauthorizedException(ConstApp.CANNOT_LOGIN);
                }
                break;
            case Role.admin:
                break;
            case Role.webuser:
                // eslint-disable-next-line no-case-declarations
                const webuser = await this.webUserModel.findOne({ ownerUserId: user._id });
                // eslint-disable-next-line no-case-declarations
                const bankingWeb = await this.bankingModel.findOne({ _id: webuser.bankingId });
                // eslint-disable-next-line no-case-declarations
                const bankingConsortiumWeb = await this.consortiumModel.findOne({ _id: bankingWeb.consortiumId });
                if (webuser.status === false || bankingWeb.status === false || bankingConsortiumWeb.status === false) {
                    throw new UnauthorizedException(ConstApp.CANNOT_LOGIN);
                }
                break;
            default:
                throw new UnauthorizedException(ConstApp.CANNOT_LOGIN);
                break;
        }
    }

    async getLoggedUser(user: User) {
        return await this.userAuthService.getUser(user._id);
    }

    async getToken(responsePayload: ResponsePayload, userIp: string, logged: boolean): Promise<ResponseSignInDto> {
        const responseSignInDto: ResponseSignInDto = new ResponseSignInDto();
        const userId: ObjectId = responsePayload.userId;
        const role: Role = responsePayload.role;
        const payload: JwtPayload = { userId, role };
        await this.verifyStatus(responsePayload);
        if (!logged) {
            const refreshToken = await this.tokenService.saveRefreshTokenGenerated(userIp, userId);
            responseSignInDto.refreshToken = await this.jwtService.signAsync(refreshToken, {
                expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES'),
                secret: this.configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
            });
        }
        responseSignInDto.accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get<string>('TOKEN_EXPIRES'),
            secret: this.configService.get<string>('TOKEN_SECRET_KEY'),
        });
        responseSignInDto.expiresIn = this.configService.get<string>('TOKEN_EXPIRES');
        return responseSignInDto;
    }

    async logOut(ipAdress: string, user: User): Promise<ResponseDto> {
        return this.tokenService.deleteRefreshToken(ipAdress, user, true);
    }
}
