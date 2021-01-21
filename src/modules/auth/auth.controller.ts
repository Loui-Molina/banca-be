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
import { SignUpCredentialsDto } from '@src/modules/auth/dtos/sign.up.credentials.dto';
import { ResponseDto } from '@utils/dtos/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ConstApp } from '@utils/const.app';
import { User } from '@src/modules/database/datamodels/schemas/user';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { ResponseSignInDto } from '@auth/dtos/response.sign.in.dto';
import { TokenService } from '@auth/token.service';
import { RefreshToken } from '@database/datamodels/schemas/refresh.token';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from '@src/common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { SignInCredentialsDto } from './dtos/sign.in.credentials.dto';
import { ChangePasswordDto } from './dtos/change.password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    private readonly logger: Logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService, private readonly tokenService: TokenService) {}

    @Post('/sign-up')
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({ type: ResponseDto, description: 'Successfully Registered' })
    @ApiCreatedResponse({
        description: 'The record has been successfully saved.',
        type: ResponseDto,
    })
    async singUp(@Body(ValidationPipe) signUpCredentialsDto: SignUpCredentialsDto): Promise<ResponseDto> {
        return this.authService.singUp(signUpCredentialsDto, null);
    }

    @Post('/sign-up-logged')
    @UseGuards(AuthGuard())
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({ type: ResponseDto, description: 'Successfully Registered' })
    @ApiCreatedResponse({
        description: 'The record has been successfully saved.',
        type: ResponseDto,
    })
    async singUpLogged(@AuthUser() user:User ,@Body(ValidationPipe) signUpCredentialsDto: SignUpCredentialsDto): Promise<ResponseDto> {
        return this.authService.singUp(signUpCredentialsDto, user);
    }

    @Post('/sign-in')
    async singIn(
        @Ip() userIp: string,
        @Body(ValidationPipe) signInCredentialsDto: SignInCredentialsDto,
    ): Promise<ResponseSignInDto> {
        this.logger.debug('UserIp ' + userIp);
        return this.authService.singIn(userIp, signInCredentialsDto);
    }

    @Post('/change-password')
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(Role.admin)
    async changePasswordRemember(
        @Ip() userIp: string,
        @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
        @AuthUser() user: User,
    ): Promise<ResponseDto> {
        return this.authService.changePassword(userIp, changePasswordDto, user, true);
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

    @Get('/refresh-token')
    @UseGuards(AuthGuard('refresh'))
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: String,
    })
    getToken(@Ip() ipAdress: string, @AuthUser() refreshToken: RefreshToken): Promise<ResponseSignInDto> {
        return this.tokenService.getRefreshToken(ipAdress, refreshToken, true);
    }

    @Get('/log-out')
    @UseGuards(AuthGuard())
    logOut(@Ip() ipAdress: string, @AuthUser() user: User): Promise<ResponseDto> {
        return this.authService.logOut(ipAdress, user);
    }
}
