import {  Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../database/datamodels/enums/Roles';
import { ResponsePayload } from '../users/dtos/response.dto';
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
    let responsePayload :ResponsePayload = new ResponsePayload();
    responsePayload = await this.userAuthService.validateUserPassword(authCredentialsDto);
    if (!responsePayload.username){
      throw new UnauthorizedException(Constants.INVALID_CREDENTIALS_ERROR);
    }
    //Deberia agregar el rol maybe
    const username : string = responsePayload.username;
    const role : Roles = responsePayload.role;
    const payload : JwtPayload = { username, role};
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
