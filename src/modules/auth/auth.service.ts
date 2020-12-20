import {  Injectable, UnauthorizedException } from '@nestjs/common';
import { UserAuthService } from '../users/user.auth.service';
import { AuthCredentialsDto } from './dtos/auth.credentials.dto';
import { Constants } from './utils/constants';

@Injectable()
export class AuthService {
  constructor( private userAuthService: UserAuthService,){
  }
  
  async singUp(authCredentialsDto: AuthCredentialsDto) : Promise<void>{
    return this.userAuthService.singUp(authCredentialsDto);
  }

  async singIn(authCredentialsDto: AuthCredentialsDto){
    const username = await this.userAuthService.validateUserPassword(authCredentialsDto);
    if (!username){
      throw new UnauthorizedException(Constants.INVALID_CREDENTIALS_ERROR);
    }
  }
}
