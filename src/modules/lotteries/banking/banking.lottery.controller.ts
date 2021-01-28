import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ConstApp } from '@utils/const.app';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { Role } from '@database/datamodels/enums/role';
import { RolesGuard } from '@auth/guards/roles.guard';
import { BankingLotteryService } from '@lotteries/banking/banking.lottery.service';
import { BankingLotteryDto } from '@lotteries/banking/dtos/banking.lottery.dto';

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
