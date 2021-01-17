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
import { SignUpCredentialsDto } from '@auth/dtos/signUp.credentials.dto';
import { ResponseDto } from '@utils/dtos/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ConstApp } from '@utils/const.app';
import { User } from '@src/modules/database/datamodels/schemas/user';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { ResponseSignInDto } from '@auth/dtos/response.sign.in.dto';
import { TokenService } from '@auth/token.service';
import { RefreshToken } from '@database/datamodels/schemas/refresh.token';
import { ChangeCredentialsDto } from './dtos/change.credentials.dto';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from '@src/common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { SignInCredentialsDto } from './dtos/signIn.credentials.dto';

@Controller('auth')
export class AuthController {
    private readonly logger: Logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService, private readonly tokenService: TokenService) {}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({ type: ResponseDto, description: 'Successfully Registered' })
    @ApiCreatedResponse({
        description: 'The record has been successfully saved.',
        type: ResponseDto,
    })
    async singUp(@Body(ValidationPipe) signUpCredentialsDto: SignUpCredentialsDto): Promise<ResponseDto> {
        return this.authService.singUp(signUpCredentialsDto);
    }

    @Post('/signin')
    async singIn(
        @Ip() userIp: string,
        @Body(ValidationPipe) signInCredentialsDto: SignInCredentialsDto,
    ): Promise<ResponseSignInDto> {
        this.logger.debug('UserIp ' + userIp);
        return this.authService.singIn(userIp, signInCredentialsDto);
    }

    @Post('/changePassword')
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(Role.admin)
    async changePassword(
        @Ip() userIp: string,
        @Body(ValidationPipe) changeCredentialsDto: ChangeCredentialsDto,
        @AuthUser() user: User,
    ): Promise<ResponseDto> {
        return this.authService.changePassword(userIp, changeCredentialsDto, user);
    }

    @Get('/loggedUser')
    @UseGuards(AuthGuard())
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: User,
    })
    getLoggedUser(@AuthUser() user: User): Promise<User> {
        return this.authService.getLoggedUser(user);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@AuthUser() user: User) {
        console.log(user);
    }

    @Post('/test1')
    @UseGuards(AuthGuard('refresh'))
    test1(@AuthUser() refreshToken: RefreshToken) {
        console.log('SUCESSFULL PASS JWT REFRESH');
        this.logger.debug('Refresh token ' + refreshToken);
        return refreshToken;
    }

    @Get('/refreshToken')
    @UseGuards(AuthGuard('refresh'))
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: String,
    })
    getToken(@Ip() ipAdress: string, @AuthUser() refreshToken: RefreshToken): Promise<ResponseSignInDto> {
        return this.tokenService.getRefreshToken(ipAdress, refreshToken, true);
    }

    @Get('/logOut')
    @UseGuards(AuthGuard())
    logOut(@Ip() ipAdress: string, @AuthUser() user: User): Promise<ResponseDto> {
        return this.authService.logOut(ipAdress, user);
    }
}
