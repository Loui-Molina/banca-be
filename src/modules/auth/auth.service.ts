import {  Injectable } from '@nestjs/common';
import { UserAuthService } from '../users/user.auth.service';
import { AuthCredentialsDto } from './dtos/auth.credentials.dto';

@Injectable()
export class AuthService {
  constructor( private userAuthService: UserAuthService,){
  }
  
  async singUp(authCredentialsDto: AuthCredentialsDto) : Promise<void>{
    return this.userAuthService.singUp(authCredentialsDto);
  }
}
