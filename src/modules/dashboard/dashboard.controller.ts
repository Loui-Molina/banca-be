import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DashboardDiagramDto } from '@src/modules/dashboard/dtos/dashboard.dto';
import { DashboardService } from '@src/modules/dashboard/dashboard.service';
import { ConstApp } from '@utils/const.app';
import {Roles} from "@src/common/decorators/roles.decorator";
import {Role} from "@database/datamodels/enums/role";

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
    @Roles(Role.admin)
    getDashboardDiagram(): Promise<DashboardDiagramDto> {
        return this.dashboardService.getDashboardDiagram();
    }
}
