import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@auth/guards/roles.guard';
import { DashboardDiagramDto } from '@dashboard/dtos/dashboard.dto';
import { DashboardService } from '@dashboard/dashboard.service';
import { ConstApp } from '@utils/const.app';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@database/datamodels/enums/role';
import { DashboardConsortiumDto } from '@dashboard/dtos/dashboard.consortium.dto';
import { DashboardBankingDto } from '@dashboard/dtos/dashboard.banking.dto';
import { AuthUser } from '@common/decorators/auth.user.decorator';
import { User } from '@database/datamodels/schemas/user';
import { DashboardGraphConsortiumDto } from '@dashboard/dtos/dashboard.graph.consortium.dto';
import { DashboardGraphBankingDto } from '@dashboard/dtos/dashboard.graph.banking.dto';
import { DashboardWidgetsDto } from '@dashboard/dtos/dashboard.widgets.dto';
import { DashboardGraphBalanceBankingDto } from '@dashboard/dtos/dashboard.graph.balance.banking.dto';

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(AuthGuard(), RolesGuard)
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('diagram')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardDiagramDto,
    })
    @Roles(Role.admin)
    getDashboardDiagram(): Promise<DashboardDiagramDto> {
        return this.dashboardService.getDashboardDiagram();
    }

    @Get('consortiums-statistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardConsortiumDto,
    })
    @Roles(Role.admin)
    getConsortiumsStatistics(): Promise<DashboardConsortiumDto[]> {
        return this.dashboardService.getConsortiumsStatistics();
    }

    @Get('banking-statistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardBankingDto,
    })
    @Roles(Role.admin, Role.consortium)
    getBankingsStatistics(@AuthUser() loggedUser: User): Promise<DashboardBankingDto[]> {
        return this.dashboardService.getBankingsStatistics(loggedUser);
    }

    @Get('graph-consortium-statistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardGraphConsortiumDto,
    })
    @Roles(Role.admin)
    getGraphConsortiumStatistics(): Promise<DashboardGraphConsortiumDto[]> {
        return this.dashboardService.getGraphConsortiumStatistics();
    }

    @Get('graph-banking-statistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardGraphBankingDto,
    })
    @Roles(Role.admin, Role.consortium)
    getGraphBankingStatistics(@AuthUser() loggedUser: User): Promise<DashboardGraphBankingDto[]> {
        return this.dashboardService.getGraphBankingStatistics(loggedUser);
    }

    @Get('admin-widgets-statistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardWidgetsDto,
    })
    @Roles(Role.admin)
    getAdminWidgetsStatistics(): Promise<DashboardWidgetsDto> {
        return this.dashboardService.getAdminWidgetsStatistics();
    }

    @Get('consortium-widgets-statistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardWidgetsDto,
    })
    @Roles(Role.consortium)
    getConsortiumWidgetsStatistics(@AuthUser() loggedUser: User): Promise<DashboardWidgetsDto> {
        return this.dashboardService.getConsortiumWidgetsStatistics(loggedUser);
    }

    @Get('banking-widgets-statistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardWidgetsDto,
    })
    @Roles(Role.banker)
    getBankingWidgetsStatistics(@AuthUser() loggedUser: User): Promise<DashboardWidgetsDto> {
        return this.dashboardService.getBankingWidgetsStatistics(loggedUser);
    }

    @Get('graph-banking-balance-statistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardGraphBalanceBankingDto,
    })
    @Roles(Role.banker)
    getGraphBankingBalanceStatistics(@AuthUser() loggedUser: User): Promise<DashboardGraphBalanceBankingDto[]> {
        return this.dashboardService.getGraphBankingBalanceStatistics(loggedUser);
    }
}
