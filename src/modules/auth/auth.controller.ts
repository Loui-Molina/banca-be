import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards, ValidationPipe} from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { AuthCredentialsDto } from '@auth/dtos/auth.credentials.dto';
import { ResponseDto } from '@utils/dtos/response.dto';
import { AuthGuard } from '@nestjs/passport';
import {ApiCreatedResponse, ApiFoundResponse, ApiOkResponse} from '@nestjs/swagger';
import {ConstApp} from "@utils/const.app";
import {User, UserDocument} from "@src/modules/database/datamodels/schemas/user";
import {AuthUser} from "@src/common/decorators/auth.user.decorator";

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
    getLoggedUser(@AuthUser() user : UserDocument): Promise<User> {
        return this.authService.getLoggedUser(user);
    }


    @Post('/test')
    @UseGuards(AuthGuard())
    test(@AuthUser() user : UserDocument) {
        console.log(user);
    }
}
