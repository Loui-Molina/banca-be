import { Controller, UseGuards, Get, Post, Body, Param } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiFoundResponse, ApiCreatedResponse } from "@nestjs/swagger";
import { AuthUser } from "src/common/decorators/auth.user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Role } from "../database/datamodels/enums/role";
import { Result } from "../database/datamodels/schemas/result";
import { User } from "../database/datamodels/schemas/user";
import { ConstApp } from "../utils/const.app";
import { AddResultDto } from "./dtos/add.result.dto";
import { ResultDto } from "./dtos/result.dto";
import { ResultsService } from "./results.service";

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
