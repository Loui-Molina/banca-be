import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ConstApp } from '@utils/const.app';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { Role } from '@database/datamodels/enums/role';
import { RolesGuard } from '@auth/guards/roles.guard';
import { WebUserLotteryDto } from '@lotteries/web-user/dtos/web-user.lottery.dto';
import { WebUserLotteryService } from '@lotteries/web-user/web-user.lottery.service';

@ApiTags('web-user/lotteries')
@Controller('web-user/lotteries')
@UseGuards(AuthGuard(), RolesGuard)
export class WebUserLotteryController {
    constructor(private readonly lotteryService: WebUserLotteryService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: WebUserLotteryDto,
    })
    @Roles(Role.webuser)
    getAll(@AuthUser() loggedUser: User): Promise<Array<WebUserLotteryDto>> {
        return this.lotteryService.getAll(loggedUser);
    }
}
