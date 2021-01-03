import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {ConstApp} from "@utils/const.app";
import {AuthUser} from "@src/common/decorators/auth.user.decorator";
import {UserDocument} from "@database/datamodels/schemas/user";
import {Result} from "@database/datamodels/schemas/result";
import {ResultsService} from "@src/modules/results/results.service";
import {ResultDto} from "@src/modules/results/dtos/result.dto";
import {AddResultDto} from "@src/modules/results/dtos/add.result.dto";

@ApiTags('results')
@Controller('results')
@UseGuards(AuthGuard())
export class ResultsController {
    constructor(private readonly resultService: ResultsService) {}


    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: ResultDto,
    })
    getAll(): Promise<Array<ResultDto>> {
        return this.resultService.getAll();
    }

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: Result,
    })
    create(@Body() dto: AddResultDto, @AuthUser() loggedUser : UserDocument): Promise<Result> {
        return this.resultService.create(dto, loggedUser);
    }

    @Get(':id')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Result,
    })
    async get(@Param('id') id: string): Promise<Result> {
        return await this.resultService.get(id);
    }

}
