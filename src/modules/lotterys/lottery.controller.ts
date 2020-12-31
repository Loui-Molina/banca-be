import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {LotteryService} from "@src/modules/lotterys/lottery.service";
import {LotteryDto} from "@src/modules/lotterys/dtos/lottery.dto";
import {Lottery} from "@database/datamodels/schemas/Lottery";

@ApiTags('lotterys')
@Controller('lotterys')
@UseGuards(AuthGuard())
export class LotteryController {
    constructor(private readonly lotteryService: LotteryService) {}

    @Get()
    @ApiFoundResponse({
        description: 'The records has been successfully founded.',
        type: LotteryDto,
    })
    getAll(): Promise<Array<LotteryDto>> {
        return this.lotteryService.getAll();
    }

    @Get('search')
    @ApiFoundResponse({
        description: 'The records has been successfully founded.',
        type: LotteryDto,
    })
    getFiltered(@Query('q') q: string, @Query('value') value: string): Promise<Array<LotteryDto>> {
        return this.lotteryService.getFiltered(q, value);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: Lottery,
    })
    create(@Body() dto: LotteryDto): Promise<Lottery> {
        return this.lotteryService.create(dto);
    }

    @Put()
    @ApiCreatedResponse({
        description: 'The record has been successfully updated.',
        type: Lottery,
    })
    update(@Body() dto: LotteryDto): Promise<Lottery> {
        return this.lotteryService.update(dto);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'The record has been successfully deleted.',
        type: Lottery,
    })
    delete(@Param('id') id: string): Promise<Lottery> {
        return this.lotteryService.delete(id);
    }

    @Get(':id')
    @ApiFoundResponse({
        description: 'The record has been successfully founded.',
        type: Lottery,
    })
    async get(@Param('id') id: string): Promise<Lottery> {
        return await this.lotteryService.get(id);
    }
}
