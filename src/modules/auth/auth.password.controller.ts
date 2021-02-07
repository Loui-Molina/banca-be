import { Body, Controller, Ip, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { ChangePasswordDto } from '@auth/dtos/change.password.dto';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { AuthPasswordService } from '@auth/auth.password.service';
import { ResponseDto } from '@utils/dtos/response.dto';
import { ChangeOldPasswordDto } from '@auth/dtos/change.old.password.dto';

@ApiTags('auth/password')
@Controller('auth/password')
export class AuthPasswordController {
    private readonly logger: Logger = new Logger(AuthPasswordController.name);

    constructor(private readonly authPasswordService: AuthPasswordService) {}

    @Post('/change')
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(Role.admin, Role.consortium)
    async changePasswordFromWindows(
        @Ip() userIp: string,
        @Body() changePasswordDto: ChangePasswordDto,
        @AuthUser() user: User,
    ): Promise<ResponseDto> {
        return this.authPasswordService.changePassword(userIp, changePasswordDto, user);
    }

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
