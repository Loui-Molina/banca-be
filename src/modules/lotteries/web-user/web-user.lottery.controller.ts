import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/common/decorators/auth.user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Role } from 'src/modules/database/datamodels/enums/role';
import { User } from 'src/modules/database/datamodels/schemas/user';
import { ConstApp } from 'src/modules/utils/const.app';
import { WebUserLotteryDto } from './dtos/web-user.lottery.dto';
import { WebUserLotteryService } from './web-user.lottery.service';

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
