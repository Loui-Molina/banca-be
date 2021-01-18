import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConstApp } from '@utils/const.app';
import { Lottery } from '@database/datamodels/schemas/lottery';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { ConsortiumLotteryService } from '@src/modules/lotteries/consortium/consortium.lottery.service';
import { ConsortiumLotteryDto } from '@src/modules/lotteries/consortium/dtos/consortium.lottery.dto';
import { Roles } from '@src/common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { ConsortiumUpdateLotteryDto } from '@src/modules/lotteries/consortium/dtos/consortium.update.lottery.dto';
import { RolesGuard } from '@auth/guards/roles.guard';

@ApiTags('consortium/lotteries')
@Controller('consortium/lotteries')
@UseGuards(AuthGuard(), RolesGuard)
export class ConsortiumLotteryController {
    constructor(private readonly lotteryService: ConsortiumLotteryService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: ConsortiumLotteryDto,
    })
    @Roles(Role.consortium)
    getAll(@AuthUser() loggedUser: User): Promise<Array<ConsortiumLotteryDto>> {
        return this.lotteryService.getAll(loggedUser);
    }

    @Put()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: ConsortiumUpdateLotteryDto,
    })
    @Roles(Role.consortium)
    update(@Body() dto: ConsortiumUpdateLotteryDto, @AuthUser() loggedUser: User): Promise<Lottery> {
        return this.lotteryService.update(dto, loggedUser);
    }

    @Get(':id')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Lottery,
    })
    @Roles(Role.consortium)
    async get(@Param('id') id: string): Promise<Lottery> {
        return await this.lotteryService.get(id);
    }
}
