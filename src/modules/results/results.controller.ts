import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConstApp } from '@utils/const.app';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { Result } from '@database/datamodels/schemas/result';
import { ResultsService } from '@results/results.service';
import { ResultDto } from '@results/dtos/result.dto';
import { AddResultDto } from '@results/dtos/add.result.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { RolesGuard } from '@auth/guards/roles.guard';

@ApiTags('results')
@Controller('results')
@UseGuards(AuthGuard(), RolesGuard)
export class ResultsController {
    constructor(private readonly resultService: ResultsService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: ResultDto,
    })
    @Roles(Role.admin, Role.consortium, Role.banker)
    getAll(): Promise<Array<ResultDto>> {
        return this.resultService.getAll();
    }

    @Post()
    @ApiCreatedResponse({
        description: ConstApp.DEFAULT_POST_OK,
        type: Result,
    })
    @Roles(Role.admin)
    create(@Body() dto: AddResultDto, @AuthUser() loggedUser: User): Promise<Result> {
        return this.resultService.create(dto, loggedUser);
    }

    @Get(':id')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: Result,
    })
    @Roles(Role.admin, Role.consortium, Role.banker)
    async get(@Param('id') id: string): Promise<Result> {
        return await this.resultService.get(id);
    }
}
