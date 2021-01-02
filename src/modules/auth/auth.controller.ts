import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { AuthCredentialsDto } from '@auth/dtos/auth.credentials.dto';
import { ResponseDto } from '@utils/dtos/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { User } from '@src/modules/database/datamodels/schemas/user';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({ type: ResponseDto, description: 'Successfully Registered' })
    @ApiCreatedResponse({
        description: 'The record has been successfully saved.',
        type: ResponseDto,
    })
    async singUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<ResponseDto> {
        return this.authService.singUp(authCredentialsDto);
    }

    @Post('/signin')
    async singIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.singIn(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req: any) {
        console.log(req);
    }
}
