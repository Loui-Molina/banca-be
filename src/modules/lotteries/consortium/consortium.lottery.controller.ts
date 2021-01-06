import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {ConstApp} from "@utils/const.app";
import {Lottery} from "@database/datamodels/schemas/lottery";
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { UserDocument } from '@database/datamodels/schemas/user';
import {ConsortiumLotteryService} from "@src/modules/lotteries/consortium/consortium.lottery.service";
import {ConsortiumLotteryDto} from "@src/modules/lotteries/consortium/dtos/consortium.lottery.dto";
import {Roles} from "@src/common/decorators/roles.decorator";
import {Role} from "@database/datamodels/enums/role";
import {ConsortiumUpdateLotteryDto} from "@src/modules/lotteries/consortium/dtos/consortium.update.lottery.dto";

@ApiTags('consortium/lotteries')
@Controller('consortium/lotteries')
@UseGuards(AuthGuard())
export class ConsortiumLotteryController {
    constructor(private readonly lotteryService: ConsortiumLotteryService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: ConsortiumLotteryDto,
    })
    @Roles(Role.consortium)
    getAll(@AuthUser() loggedUser : UserDocument): Promise<Array<ConsortiumLotteryDto>> {
        return this.lotteryService.getAll(loggedUser);
    }

    @Put()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: ConsortiumUpdateLotteryDto,
    })
    @Roles(Role.consortium)
    update(@Body() dto: ConsortiumUpdateLotteryDto, @AuthUser() loggedUser : UserDocument): Promise<Lottery> {
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
