import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Ip,
    Logger,
    Post,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { SignUpCredentialsDto } from '@auth/dtos/sign.up.credentials.dto';
import { ResponseDto } from '@utils/dtos/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ConstApp } from '@utils/const.app';
import { User } from '@database/datamodels/schemas/user';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { ResponseSignInDto } from '@auth/dtos/response.sign.in.dto';
import { TokenService } from '@auth/token.service';
import { RefreshToken } from '@database/datamodels/schemas/refresh.token';
import { SignInCredentialsDto } from '@auth/dtos/sign.in.credentials.dto';
import { AuthRefreshToken } from '@common/decorators/auth.refresh.token.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    private readonly logger: Logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService, private readonly tokenService: TokenService) {}

    //THIS METHOD SHOULDNT BE IN PROD
    //WARNING
    @Post('/sign-up')
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({ type: ResponseDto, description: 'Successfully Registered' })
    @ApiCreatedResponse({
        description: 'The record has been successfully saved.',
        type: ResponseDto,
    })
    async singUp(@Body(ValidationPipe) signUpCredentialsDto: SignUpCredentialsDto): Promise<ResponseDto> {
        return this.authService.signUp(signUpCredentialsDto, null);
    }

    @Post('/sign-up-logged')
    @UseGuards(AuthGuard())
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({ type: ResponseDto, description: 'Successfully Registered' })
    @ApiCreatedResponse({
        description: 'The record has been successfully saved.',
        type: ResponseDto,
    })
    async singUpLogged(
        @AuthUser() user: User,
        @Body() signUpCredentialsDto: SignUpCredentialsDto,
    ): Promise<ResponseDto> {
        return this.authService.signUp(signUpCredentialsDto, user);
    }

    @Post('/sign-in')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: ResponseSignInDto,
    })
    async singIn(@Ip() userIp: string, @Body() signInCredentialsDto: SignInCredentialsDto): Promise<ResponseSignInDto> {
        this.logger.debug('UserIp ' + userIp);
        return this.authService.signIn(userIp, signInCredentialsDto);
    }

    @Get('/logged-user')
    @UseGuards(AuthGuard())
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: User,
    })
    getLoggedUser(@AuthUser() user: User): Promise<User> {
        return this.authService.getLoggedUser(user);
    }

    @Get('/refresh-token')
    @UseGuards(AuthGuard('refresh'))
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: String,
    })
    getToken(@Ip() ipAdress: string, @AuthRefreshToken() refreshToken: RefreshToken): Promise<ResponseSignInDto> {
        return this.tokenService.getRefreshToken(ipAdress, refreshToken, true);
    }

    @Get('/log-out')
    @UseGuards(AuthGuard())
    logOut(@Ip() ipAdress: string, @AuthUser() user: User): Promise<ResponseDto> {
        return this.authService.logOut(ipAdress, user);
    }
}
