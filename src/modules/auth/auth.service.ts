import {  Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuthService } from '../users/user.auth.service';
import { AuthCredentialsDto } from './dtos/auth.credentials.dto';
import { JwtPayload } from './jwt.payload.interface';
import { Constants } from './utils/constants';

@Injectable()
export class AuthService {
  constructor( private userAuthService: UserAuthService,
    private jwtService: JwtService){
  }
  
  async singUp(authCredentialsDto: AuthCredentialsDto) : Promise<void>{
    return this.userAuthService.singUp(authCredentialsDto);
  }

  async singIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
    const username = await this.userAuthService.validateUserPassword(authCredentialsDto);
    if (!username){
      throw new UnauthorizedException(Constants.INVALID_CREDENTIALS_ERROR);
    }
    //Deberia agregar el rol maybe
    const payload : JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
