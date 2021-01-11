import { Body, Controller, Get, HttpCode, HttpStatus, Ip, Logger, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { AuthCredentialsDto } from '@auth/dtos/auth.credentials.dto';
import { ResponseDto } from '@utils/dtos/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ConstApp } from '@utils/const.app';
import { User, UserDocument } from '@src/modules/database/datamodels/schemas/user';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { ResponseSignInDto } from '@auth/dtos/response.sign.in.dto';
import { TokenService } from '@auth/token.service';
import { RefreshToken, RefreshTokenDocument } from '@database/datamodels/schemas/refresh.token';
;

@Controller('auth')
export class AuthController {

    private readonly logger : Logger = new Logger(AuthController.name); 

    constructor(private readonly authService: AuthService,
        private readonly tokenService: TokenService) {}

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
    async singIn(@Ip() userIp:string, @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<ResponseSignInDto> {
        this.logger.debug("UserIp " + userIp)
        return this.authService.singIn(userIp, authCredentialsDto);
    }

    @Get('/loggedUser')
    @UseGuards(AuthGuard())
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: User,
    })
    getLoggedUser(@AuthUser() user: UserDocument): Promise<User> {
        return this.authService.getLoggedUser(user);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@AuthUser() user: UserDocument) {
        console.log(user);
    }

    @Post('/test1')
    @UseGuards(AuthGuard("refresh"))
    test1(@AuthUser() refreshToken:RefreshTokenDocument,) {
        console.log("SUCESSFULL PASS JWT REFRESH");
        this.logger.debug("Refresh token "+refreshToken);
        return refreshToken;

    }

    @Get('/refreshToken')
    @UseGuards(AuthGuard("refresh"))
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: String,
    })
    getToken(@Ip() ipAdress:string, @AuthUser() refreshToken:RefreshToken): Promise<ResponseSignInDto> {
        return this.tokenService.getRefreshToken(ipAdress,refreshToken);
    }

    @Get('/logOut')
    @UseGuards(AuthGuard())
    logOut(@Ip() ipAdress:string, @AuthUser() user:UserDocument): Promise<ResponseDto> {
        return this.authService.logOut(ipAdress,user);
    }
}
