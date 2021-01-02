import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {LotteryService} from "@src/modules/lotteries/lottery.service";
import {LotteryDto} from "@src/modules/lotteries/dtos/lottery.dto";
import {Lottery} from "@src/modules/database/datamodels/schemas/lottery";
import {ConstApp} from "@utils/const.app";

@ApiTags('lotteries')
@Controller('lotteries')
@UseGuards(AuthGuard())
export class LotteryController {
    constructor(private readonly lotteryService: LotteryService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: LotteryDto,
    })
    getAll(): Promise<Array<LotteryDto>> {
        return this.lotteryService.getAll();
    }

    @Get('search')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: LotteryDto,
    })
    getFiltered(@Query('q') q: string, @Query('value') value: string): Promise<Array<LotteryDto>> {
        return this.lotteryService.getFiltered(q, value);
    }

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: Lottery,
    })
    create(@Body() dto: LotteryDto): Promise<Lottery> {
        return this.lotteryService.create(dto);
    }

    @Put()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: Lottery,
    })
    update(@Body() dto: LotteryDto): Promise<Lottery> {
        return this.lotteryService.update(dto);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: ConstApp.DEFAULT_DELETE_OK,
        type: Lottery,
    })
    delete(@Param('id') id: string): Promise<Lottery> {
        return this.lotteryService.delete(id);
    }

    @Get(':id')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Lottery,
    })
    async get(@Param('id') id: string): Promise<Lottery> {
        return await this.lotteryService.get(id);
    }
}
