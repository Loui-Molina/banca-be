import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConsortiumService } from '@src/modules/consortiums/consortium.service';
import { ConsortiumDto } from '@src/modules/consortiums/dtos/consortium.dto';
import {ConstApp} from "@utils/const.app";
import {Consortium} from "@database/datamodels/schemas/Consortium";

@ApiTags('consortiums')
@Controller('consortiums')
@UseGuards(AuthGuard())
export class ConsortiumController {
    constructor(private readonly consortiumService: ConsortiumService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: ConsortiumDto,
    })
    getAll(): Promise<Array<ConsortiumDto>> {
        return this.consortiumService.getAll();
    }

    @Get('search')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Consortium,
    })
    getFiltered(@Query('q') q: string, @Query('value') value: any): Promise<Array<Consortium>> {
        return this.consortiumService.getFiltered(q, value);
    }

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: Consortium,
    })
    create(@Body() dto: ConsortiumDto): Promise<Consortium> {
        return this.consortiumService.create(dto);
    }

    @Put()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_PUT_OK,
        type: Consortium,
    })
    update(@Body() dto: ConsortiumDto): Promise<Consortium> {
        return this.consortiumService.update(dto);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: ConstApp.DEFAULT_DELETE_OK,
        type: Consortium,
    })
    delete(@Param('id') id: string): Promise<Consortium> {
        return this.consortiumService.delete(id);
    }

    @Get(':id')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Consortium,
    })
    async get(@Param('id') id: string): Promise<Consortium> {
        return await this.consortiumService.get(id);
    }
}
