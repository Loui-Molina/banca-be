import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminLotteryService } from '@src/modules/lotteries/admin/admin.lottery.service';
import { AdminLotteryReqDto } from '@src/modules/lotteries/admin/dtos/admin.lottery.req.dto';
import { ConstApp } from '@utils/const.app';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { Roles } from '@src/common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { AdminLotteryResDto } from '@src/modules/lotteries/admin/dtos/admin.lottery.res.dto';
import { RolesGuard } from '@auth/guards/roles.guard';

@ApiTags('admin/lotteries')
@Controller('admin/lotteries')
@UseGuards(AuthGuard(), RolesGuard)
export class AdminLotteryController {
    constructor(private readonly lotteryService: AdminLotteryService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: AdminLotteryResDto,
    })
    @Roles(Role.admin)
    getAll(): Promise<Array<AdminLotteryResDto>> {
        return this.lotteryService.getAll();
    }

    @Get('search')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: AdminLotteryResDto,
    })
    @Roles(Role.admin)
    getFiltered(@Query('q') q: string, @Query('value') value: string): Promise<Array<AdminLotteryResDto>> {
        return this.lotteryService.getFiltered(q, value);
    }

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: AdminLotteryResDto,
    })
    @Roles(Role.admin)
    create(@Body() dto: AdminLotteryReqDto, @AuthUser() loggedUser: User): Promise<AdminLotteryResDto> {
        return this.lotteryService.create(dto, loggedUser);
    }

    @Put()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: AdminLotteryResDto,
    })
    @Roles(Role.admin)
    update(@Body() dto: AdminLotteryReqDto, @AuthUser() loggedUser: User): Promise<AdminLotteryResDto> {
        return this.lotteryService.update(dto, loggedUser);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: ConstApp.DEFAULT_DELETE_OK,
        type: Object,
    })
    @Roles(Role.admin)
    delete(@Param('id') id: string) {
        return this.lotteryService.delete(id);
    }

    @Get(':id')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: AdminLotteryResDto,
    })
    @Roles(Role.admin)
    async get(@Param('id') id: string): Promise<AdminLotteryResDto> {
        return await this.lotteryService.get(id);
    }
}
