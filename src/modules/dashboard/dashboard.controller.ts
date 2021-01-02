import { Controller, Get ,UseGuards } from '@nestjs/common';
import { ApiFoundResponse,  ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {DashboardDiagramDto} from "@src/modules/dashboard/dtos/dashboard.dto";
import {DashboardService} from "@src/modules/dashboard/dashboard.service";
import {ConstApp} from "@utils/const.app";

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(AuthGuard())
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get()
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardDiagramDto,
    })
    getDashboardDiagram(): Promise<DashboardDiagramDto> {
        return this.dashboardService.getDashboardDiagram();
    }
}
