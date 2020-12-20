import { Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { AuthCredentialsDto } from '@auth/dtos/auth.credentials.dto';
import { ResponseDto } from '../utils/dtos/response.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async singUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<ResponseDto>{
      return this.authService.singUp(authCredentialsDto);
  }

  @Post('/signin')
  async singIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken : string}>{
      return this.authService.singIn(authCredentialsDto);
  }
}
