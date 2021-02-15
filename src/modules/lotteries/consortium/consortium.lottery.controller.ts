import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConstApp } from '@utils/const.app';
import { AuthUser } from 'src/common/decorators/auth.user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Role } from 'src/modules/database/datamodels/enums/role';
import { Lottery } from 'src/modules/database/datamodels/schemas/lottery';
import { User } from 'src/modules/database/datamodels/schemas/user';
import { ConsortiumLotteryService } from './consortium.lottery.service';
import { ConsortiumLotteryDto } from './dtos/consortium.lottery.dto';
import { ConsortiumUpdateLotteryDto } from './dtos/consortium.update.lottery.dto';


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
