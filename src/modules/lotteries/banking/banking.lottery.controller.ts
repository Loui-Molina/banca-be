import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { Roles } from '@src/common/decorators/roles.decorator';
import { RolesGuard } from '@src/modules/auth/guards/roles.guard';
import { Role } from '@src/modules/database/datamodels/enums/role';
import { User } from '@src/modules/database/datamodels/schemas/user';
import { ConstApp } from '@src/modules/utils/const.app';
import { BankingLotteryService } from './banking.lottery.service';
import { BankingLotteryDto } from './dtos/banking.lottery.dto';

@ApiTags('banking/lotteries')
@Controller('banking/lotteries')
@UseGuards(AuthGuard(), RolesGuard)
export class BankingLotteryController {
    constructor(private readonly lotteryService: BankingLotteryService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: BankingLotteryDto,
    })
    @Roles(Role.banker)
    getAll(@AuthUser() loggedUser: User): Promise<Array<BankingLotteryDto>> {
        return this.lotteryService.getAll(loggedUser);
    }
}
