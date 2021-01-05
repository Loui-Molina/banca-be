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
    getAll(): Promise<Array<ConsortiumLotteryDto>> {
        return this.lotteryService.getAll();
    }

    @Get('search')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: ConsortiumLotteryDto,
    })
    @Roles(Role.consortium)
    getFiltered(@Query('q') q: string, @Query('value') value: string): Promise<Array<ConsortiumLotteryDto>> {
        return this.lotteryService.getFiltered(q, value);
    }

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: Lottery,
    })
    @Roles(Role.consortium)
    create(@Body() dto: ConsortiumLotteryDto, @AuthUser() loggedUser : UserDocument): Promise<Lottery> {
        return this.lotteryService.create(dto, loggedUser);
    }

    @Put()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: Lottery,
    })
    @Roles(Role.consortium)
    update(@Body() dto: ConsortiumLotteryDto, @AuthUser() loggedUser : UserDocument): Promise<Lottery> {
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
