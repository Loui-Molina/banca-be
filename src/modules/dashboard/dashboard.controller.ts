import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {DashboardDiagramDto} from "@src/modules/dashboard/dtos/dashboardDiagram.dto";
import {DashboardService} from "@src/modules/dashboard/dashboard.service";

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(AuthGuard())
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get()
    @ApiFoundResponse({
        description: 'The records has been successfully founded.',
        type: DashboardDiagramDto,
    })
    getDashboardDiagram(): Promise<DashboardDiagramDto> {
        return this.dashboardService.getDashboardDiagram();
    }
}
