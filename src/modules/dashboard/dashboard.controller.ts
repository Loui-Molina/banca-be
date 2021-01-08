import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DashboardDiagramDto } from '@src/modules/dashboard/dtos/dashboard.dto';
import { DashboardService } from '@src/modules/dashboard/dashboard.service';
import { ConstApp } from '@utils/const.app';
import {Roles} from "@src/common/decorators/roles.decorator";
import {Role} from "@database/datamodels/enums/role";
import {DashboardConsortiumDto} from "@src/modules/dashboard/dtos/dashboard.consortium.dto";
import {DashboardBankingDto} from "@src/modules/dashboard/dtos/dashboard.banking.dto";
import {AuthUser} from "@src/common/decorators/auth.user.decorator";
import {UserDocument} from "@database/datamodels/schemas/user";
import {DashboardGraphConsortiumDto} from "@src/modules/dashboard/dtos/dashboard.graph.consortium.dto";

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(AuthGuard())
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('getDashboardDiagram')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardDiagramDto,
    })
    @Roles(Role.admin)
    getDashboardDiagram(): Promise<DashboardDiagramDto> {
        return this.dashboardService.getDashboardDiagram();
    }

    @Get('getConsortiumsStatistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardConsortiumDto,
    })
    @Roles(Role.admin)
    getConsortiumsStatistics(): Promise<DashboardConsortiumDto[]> {
        return this.dashboardService.getConsortiumsStatistics();
    }

    @Get('getBankingsStatistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardBankingDto,
    })
    @Roles(Role.admin, Role.consortium)
    getBankingsStatistics(@AuthUser() loggedUser : UserDocument): Promise<DashboardBankingDto[]> {
        return this.dashboardService.getBankingsStatistics(loggedUser);
    }


    @Get('getGraphConsortiumStatistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardGraphConsortiumDto,
    })
    @Roles(Role.admin)
    getGraphConsortiumStatistics(): Promise<DashboardGraphConsortiumDto[]> {
        return this.dashboardService.getGraphConsortiumStatistics();
    }
}
