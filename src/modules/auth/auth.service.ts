import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponsePayload } from '@users/dtos/response.payload.dto';
import { AuthUserService } from '@src/modules/auth.user/auth.user..service';
import { ConstApp } from '@utils/const.app';
import { AuthCredentialsDto } from '@auth/dtos/auth.credentials.dto';
import { JwtPayload } from '@auth/jwt.payload.interface';
import { ResponseDto } from '@utils/dtos/response.dto';
import { Role } from '@database/datamodels/enums/role';
import { User, UserDocument } from '@src/modules/database/datamodels/schemas/user';


@Injectable()
export class AuthService {
    constructor(
        private userAuthService: AuthUserService,
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<ResponseDto> {
        return this.userAuthService.singUp(authCredentialsDto).then((createdUser) => createdUser.response);
    }

    async singIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        let responsePayload: ResponsePayload = new ResponsePayload();
        responsePayload = await this.userAuthService.validateUserPassword(authCredentialsDto);
        if (!responsePayload.username) {
            throw new UnauthorizedException(ConstApp.INVALID_CREDENTIALS_ERROR);
        }
        const username: string = responsePayload.username;
        const role: Role = responsePayload.role;
        const payload: JwtPayload = { username, role };
        const accessToken = await this.jwtService.signAsync(payload);
        return { accessToken };
    }

    async getLoggedUser(user: UserDocument) {
        return await this.userModel.findById(user.id).exec();
    }
}
