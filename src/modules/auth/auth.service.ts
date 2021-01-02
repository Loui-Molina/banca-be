import {Injectable, UnauthorizedException, UseGuards} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponsePayload } from '@users/dtos/response.payload.dto';
import { UserAuthService } from '@users/user.auth.service';
import { ConstApp } from '@utils/const.app';
import { AuthCredentialsDto } from '@auth/dtos/auth.credentials.dto';
import { JwtPayload } from '@auth/jwt.payload.interface';
import { ResponseDto } from '@utils/dtos/response.dto';
import { Role } from '@database/datamodels/enums/role';
import {User, UserDocument} from "@src/modules/database/datamodels/schemas/u1ser";
import {UserService} from "@users/user.service";

@Injectable()
export class AuthService {
    constructor(private userAuthService: UserAuthService, private jwtService: JwtService) {}

    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<ResponseDto> {
        return this.userAuthService.singUp(authCredentialsDto);
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

    async getLoggedUser(user: UserDocument){
        return new User(); //await this.userService.get(user.id);
    }
}
