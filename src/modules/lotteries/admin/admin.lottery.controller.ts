import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {AdminLotteryService} from "@src/modules/lotteries/admin/admin.lottery.service";
import {AdminLotteryDto} from "@src/modules/lotteries/admin/dtos/admin.lottery.dto";
import {ConstApp} from "@utils/const.app";
import {Lottery} from "@database/datamodels/schemas/lottery";
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { UserDocument } from '@database/datamodels/schemas/user';
import {Roles} from "@src/common/decorators/roles.decorator";
import {Role} from "@database/datamodels/enums/role";

@ApiTags('admin/lotteries')
@Controller('admin/lotteries')
@UseGuards(AuthGuard())
export class AdminLotteryController {
    constructor(private readonly lotteryService: AdminLotteryService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: AdminLotteryDto,
    })
    @Roles(Role.admin)
    getAll(): Promise<Array<AdminLotteryDto>> {
        return this.lotteryService.getAll();
    }

    @Get('search')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: AdminLotteryDto,
    })
    @Roles(Role.admin)
    getFiltered(@Query('q') q: string, @Query('value') value: string): Promise<Array<AdminLotteryDto>> {
        return this.lotteryService.getFiltered(q, value);
    }

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: Lottery,
    })
    @Roles(Role.admin)
    create(@Body() dto: AdminLotteryDto, @AuthUser() loggedUser : UserDocument): Promise<Lottery> {
        return this.lotteryService.create(dto, loggedUser);
    }

    @Put()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: Lottery,
    })
    @Roles(Role.admin)
    update(@Body() dto: AdminLotteryDto, @AuthUser() loggedUser : UserDocument): Promise<Lottery> {
        return this.lotteryService.update(dto, loggedUser);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: ConstApp.DEFAULT_DELETE_OK,
        type: Lottery,
    })
    @Roles(Role.admin)
    delete(@Param('id') id: string): Promise<Lottery> {
        return this.lotteryService.delete(id);
    }

    @Get(':id')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Lottery,
    })
    @Roles(Role.admin)
    async get(@Param('id') id: string): Promise<Lottery> {
        return await this.lotteryService.get(id);
    }
}
