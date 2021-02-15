import { Body, Controller, Ip, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { Roles } from '@src/common/decorators/roles.decorator';
import { Role } from '../database/datamodels/enums/role';
import { User } from '../database/datamodels/schemas/user';
import { ConstApp } from '../utils/const.app';
import { ResponseDto } from '../utils/dtos/response.dto';
import { AuthPasswordService } from './auth.password.service';
import { ChangeOldPasswordDto } from './dtos/change.old.password.dto';
import { ChangePasswordDto } from './dtos/change.password.dto';
import { RolesGuard } from './guards/roles.guard';

@ApiTags('auth/password')
@Controller('auth/password')
export class AuthPasswordController {
    private readonly logger: Logger = new Logger(AuthPasswordController.name);

    constructor(private readonly authPasswordService: AuthPasswordService) {}

    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: ResponseDto,
    })
    @Post('/change')
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(Role.admin, Role.consortium, Role.banker)
    async changePasswordFromWindows(
        @Ip() userIp: string,
        @Body() changePasswordDto: ChangePasswordDto,
        @AuthUser() user: User,
    ): Promise<ResponseDto> {
        return this.authPasswordService.changePassword(userIp, changePasswordDto, user);
    }

    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: ResponseDto,
    })
    @Post()
    @UseGuards(AuthGuard(), RolesGuard)
    async changePassword(
        @Ip() userIp: string,
        @Body() changeOldPasswordDto: ChangeOldPasswordDto,
        @AuthUser() user: User,
    ): Promise<ResponseDto> {
        return this.authPasswordService.changePasswordRemember(userIp, changeOldPasswordDto, user);
    }
}
