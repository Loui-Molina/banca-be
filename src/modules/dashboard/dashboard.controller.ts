import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DashboardDiagramDto } from '@src/modules/dashboard/dtos/dashboard.dto';
import { DashboardService } from '@src/modules/dashboard/dashboard.service';
import { ConstApp } from '@utils/const.app';
import { Roles } from '@src/common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { DashboardConsortiumDto } from '@src/modules/dashboard/dtos/dashboard.consortium.dto';
import { DashboardBankingDto } from '@src/modules/dashboard/dtos/dashboard.banking.dto';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { DashboardGraphConsortiumDto } from '@src/modules/dashboard/dtos/dashboard.graph.consortium.dto';
import { DashboardGraphBankingDto } from '@src/modules/dashboard/dtos/dashboard.graph.banking.dto';
import { DashboardWidgetsDto } from '@src/modules/dashboard/dtos/dashboard.widgets.dto';
import { RolesGuard } from '@auth/guards/roles.guard';
import { DashboardGraphBalanceBankingDto } from '@src/modules/dashboard/dtos/dashboard.graph.balance.banking.dto';

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(AuthGuard(), RolesGuard)
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
    getBankingsStatistics(@AuthUser() loggedUser: User): Promise<DashboardBankingDto[]> {
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

    @Get('getGraphBankingStatistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardGraphBankingDto,
    })
    @Roles(Role.admin, Role.consortium)
    getGraphBankingStatistics(@AuthUser() loggedUser: User): Promise<DashboardGraphBankingDto[]> {
        return this.dashboardService.getGraphBankingStatistics(loggedUser);
    }

    @Get('getAdminWidgetsStatistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardWidgetsDto,
    })
    @Roles(Role.admin)
    getAdminWidgetsStatistics(): Promise<DashboardWidgetsDto> {
        return this.dashboardService.getAdminWidgetsStatistics();
    }

    @Get('getConsortiumWidgetsStatistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardWidgetsDto,
    })
    @Roles(Role.consortium)
    getConsortiumWidgetsStatistics(@AuthUser() loggedUser: User): Promise<DashboardWidgetsDto> {
        return this.dashboardService.getConsortiumWidgetsStatistics(loggedUser);
    }

    @Get('getBankingWidgetsStatistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardWidgetsDto,
    })
    @Roles(Role.banker)
    getBankingWidgetsStatistics(@AuthUser() loggedUser: User): Promise<DashboardWidgetsDto> {
        return this.dashboardService.getBankingWidgetsStatistics(loggedUser);
    }

    @Get('getGraphBankingBalanceStatistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardGraphBalanceBankingDto,
    })
    @Roles(Role.banker)
    getGraphBankingBalanceStatistics(@AuthUser() loggedUser: User): Promise<DashboardGraphBalanceBankingDto[]> {
        return this.dashboardService.getGraphBankingBalanceStatistics(loggedUser);
    }
}
