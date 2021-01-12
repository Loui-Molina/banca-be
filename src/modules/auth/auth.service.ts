import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
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
import { ResponseSignInDto } from '@auth/dtos/response.sign.in.dto';
import { ConfigService } from '@nestjs/config';
import { AuthCredentialsDto } from '@auth/dtos/auth.credentials.dto';
import { TokenService } from '@auth/token.service';


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

    async singIn(userIp:string, authCredentialsDto: AuthCredentialsDto): Promise<ResponseSignInDto> {
        let responsePayload: ResponsePayload = new ResponsePayload();
        responsePayload = await this.userAuthService.validateUserPassword(authCredentialsDto);
        if (!responsePayload.userId) {
            throw new UnauthorizedException(ConstApp.INVALID_CREDENTIALS_ERROR);
        }
        return await this.getToken(responsePayload,userIp, false);
    }

    async getLoggedUser(user: UserDocument) {
        return await this.userModel.findById(user.id).exec();
    }

    async getToken(responsePayload:ResponsePayload, userIp:string,logged:boolean):Promise<ResponseSignInDto>{
        let responseSignInDto: ResponseSignInDto = new ResponseSignInDto();
        const userId: string = responsePayload.userId;
        const role: Role = responsePayload.role;
        const payload: JwtPayload = { userId, role };
        if(!logged){
        const refreshToken = await this.tokenService.createRefreshToken(userIp,userId);
        this.logger.debug("Logged"+logged);
        const tokenPrueba = await this.jwtService.signAsync(refreshToken,{ expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES'),
        secret:this.configService.get<string>('REFRESH_TOKEN_SECRET_KEY')})
        responseSignInDto.refreshToken = tokenPrueba;};
        const accessToken = await this.jwtService.signAsync(payload,{ expiresIn: this.configService.get<string>('TOKEN_EXPIRES'),
        secret:this.configService.get<string>('TOKEN_SECRET_KEY')});
        responseSignInDto.accessToken = accessToken;
        responseSignInDto.expiresIn =  this.configService.get<string>('TOKEN_EXPIRES'); 
        return responseSignInDto;
    }

    async logOut(ipAdress:string,user:UserDocument):Promise<ResponseDto>{
        return this.tokenService.deleteRefreshToken(ipAdress,user);
    }
    
}
