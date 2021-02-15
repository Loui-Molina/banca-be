import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';
import { Roles } from '@src/common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../database/datamodels/enums/role';
import { User } from '../database/datamodels/schemas/user';
import { ConstApp } from '../utils/const.app';
import { DashboardService } from './dashboard.service';
import { DashboardBankingDto } from './dtos/dashboard.banking.dto';
import { DashboardConsortiumDto } from './dtos/dashboard.consortium.dto';
import { DashboardDiagramDto } from './dtos/dashboard.dto';
import { DashboardGraphBalanceBankingDto } from './dtos/dashboard.graph.balance.banking.dto';
import { DashboardGraphBankingDto } from './dtos/dashboard.graph.banking.dto';
import { DashboardGraphConsortiumBalanceBankingDto } from './dtos/dashboard.graph.consortium.balance.banking.dto';
import { DashboardGraphConsortiumDto } from './dtos/dashboard.graph.consortium.dto';
import { DashboardPlayedNumbersDto } from './dtos/dashboard.played.numbers.dto';
import { DashboardWidgetsDto } from './dtos/dashboard.widgets.dto';


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

    @Get('webuser-widgets-statistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardWidgetsDto,
    })
    @Roles(Role.webuser)
    getWebUserWidgetsStatistics(@AuthUser() loggedUser: User): Promise<DashboardWidgetsDto> {
        return this.dashboardService.getWebUserWidgetsStatistics(loggedUser);
    }

    @Get('banking-played-numbers-statistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardPlayedNumbersDto,
    })
    @Roles(Role.banker)
    getBankingPlayedNumbersStatistics(@AuthUser() loggedUser: User): Promise<DashboardPlayedNumbersDto> {
        return this.dashboardService.getBankingPlayedNumbersStatistics(loggedUser);
    }

    @Get('consortium-played-numbers-statistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardPlayedNumbersDto,
    })
    @Roles(Role.consortium)
    getConsortiumPlayedNumbersStatistics(@AuthUser() loggedUser: User): Promise<DashboardPlayedNumbersDto> {
        return this.dashboardService.getConsortiumPlayedNumbersStatistics(loggedUser);
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

    @Get('graph-consortium-banking-balance-statistics')
    @ApiFoundResponse({
        description: ConstApp.DEFAULT_GET_OK,
        type: DashboardGraphConsortiumBalanceBankingDto,
    })
    @Roles(Role.consortium)
    getGraphConsortiumBankingBalanceStatistics(
        @AuthUser() loggedUser: User,
    ): Promise<DashboardGraphConsortiumBalanceBankingDto[]> {
        return this.dashboardService.getGraphConsortiumBankingBalanceStatistics(loggedUser);
    }
}
