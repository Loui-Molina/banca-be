import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards, ValidationPipe} from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { AuthCredentialsDto } from '@auth/dtos/auth.credentials.dto';
import { ResponseDto } from '@utils/dtos/response.dto';
import { AuthGuard } from '@nestjs/passport';
import {ApiCreatedResponse, ApiFoundResponse, ApiOkResponse} from '@nestjs/swagger';
import { User } from '@database/datamodels/schemas/User';
import {ConstApp} from "@utils/const.app";

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

    @Get('/loggedUser')
    @UseGuards(AuthGuard())
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: User,
    })
    getLoggedUser(@Req() request: any): Promise<User> {
        return this.authService.getLoggedUser(request);
    }


    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req: any) {
        console.log(req);
    }
}
