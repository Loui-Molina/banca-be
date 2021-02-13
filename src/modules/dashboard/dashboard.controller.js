"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.DashboardController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var passport_1 = require("@nestjs/passport");
var roles_guard_1 = require("@auth/guards/roles.guard");
var dashboard_dto_1 = require("@dashboard/dtos/dashboard.dto");
var const_app_1 = require("@utils/const.app");
var roles_decorator_1 = require("@common/decorators/roles.decorator");
var role_1 = require("@database/datamodels/enums/role");
var dashboard_consortium_dto_1 = require("@dashboard/dtos/dashboard.consortium.dto");
var dashboard_banking_dto_1 = require("@dashboard/dtos/dashboard.banking.dto");
var auth_user_decorator_1 = require("@common/decorators/auth.user.decorator");
var dashboard_graph_consortium_dto_1 = require("@dashboard/dtos/dashboard.graph.consortium.dto");
var dashboard_graph_banking_dto_1 = require("@dashboard/dtos/dashboard.graph.banking.dto");
var dashboard_widgets_dto_1 = require("@dashboard/dtos/dashboard.widgets.dto");
var dashboard_graph_balance_banking_dto_1 = require("@dashboard/dtos/dashboard.graph.balance.banking.dto");
var dashboard_played_numbers_dto_1 = require("@dashboard/dtos/dashboard.played.numbers.dto");
var dashboard_graph_consortium_balance_banking_dto_1 = require("@dashboard/dtos/dashboard.graph.consortium.balance.banking.dto");
var DashboardController = /** @class */ (function () {
    function DashboardController(dashboardService) {
        this.dashboardService = dashboardService;
    }
    DashboardController.prototype.getDashboardDiagram = function () {
        return this.dashboardService.getDashboardDiagram();
    };
    DashboardController.prototype.getConsortiumsStatistics = function () {
        return this.dashboardService.getConsortiumsStatistics();
    };
    DashboardController.prototype.getBankingsStatistics = function (loggedUser) {
        return this.dashboardService.getBankingsStatistics(loggedUser);
    };
    DashboardController.prototype.getGraphConsortiumStatistics = function () {
        return this.dashboardService.getGraphConsortiumStatistics();
    };
    DashboardController.prototype.getGraphBankingStatistics = function (loggedUser) {
        return this.dashboardService.getGraphBankingStatistics(loggedUser);
    };
    DashboardController.prototype.getAdminWidgetsStatistics = function () {
        return this.dashboardService.getAdminWidgetsStatistics();
    };
    DashboardController.prototype.getConsortiumWidgetsStatistics = function (loggedUser) {
        return this.dashboardService.getConsortiumWidgetsStatistics(loggedUser);
    };
    DashboardController.prototype.getBankingWidgetsStatistics = function (loggedUser) {
        return this.dashboardService.getBankingWidgetsStatistics(loggedUser);
    };
    DashboardController.prototype.getWebUserWidgetsStatistics = function (loggedUser) {
        return this.dashboardService.getWebUserWidgetsStatistics(loggedUser);
    };
    DashboardController.prototype.getBankingPlayedNumbersStatistics = function (loggedUser) {
        return this.dashboardService.getBankingPlayedNumbersStatistics(loggedUser);
    };
    DashboardController.prototype.getConsortiumPlayedNumbersStatistics = function (loggedUser) {
        return this.dashboardService.getConsortiumPlayedNumbersStatistics(loggedUser);
    };
    DashboardController.prototype.getGraphBankingBalanceStatistics = function (loggedUser) {
        return this.dashboardService.getGraphBankingBalanceStatistics(loggedUser);
    };
    DashboardController.prototype.getGraphConsortiumBankingBalanceStatistics = function (loggedUser) {
        return this.dashboardService.getGraphConsortiumBankingBalanceStatistics(loggedUser);
    };
    __decorate([
        common_1.Get('diagram'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: dashboard_dto_1.DashboardDiagramDto
        }),
        roles_decorator_1.Roles(role_1.Role.admin)
    ], DashboardController.prototype, "getDashboardDiagram");
    __decorate([
        common_1.Get('consortiums-statistics'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: dashboard_consortium_dto_1.DashboardConsortiumDto
        }),
        roles_decorator_1.Roles(role_1.Role.admin)
    ], DashboardController.prototype, "getConsortiumsStatistics");
    __decorate([
        common_1.Get('banking-statistics'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: dashboard_banking_dto_1.DashboardBankingDto
        }),
        roles_decorator_1.Roles(role_1.Role.admin, role_1.Role.consortium),
        __param(0, auth_user_decorator_1.AuthUser())
    ], DashboardController.prototype, "getBankingsStatistics");
    __decorate([
        common_1.Get('graph-consortium-statistics'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: dashboard_graph_consortium_dto_1.DashboardGraphConsortiumDto
        }),
        roles_decorator_1.Roles(role_1.Role.admin)
    ], DashboardController.prototype, "getGraphConsortiumStatistics");
    __decorate([
        common_1.Get('graph-banking-statistics'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: dashboard_graph_banking_dto_1.DashboardGraphBankingDto
        }),
        roles_decorator_1.Roles(role_1.Role.admin, role_1.Role.consortium),
        __param(0, auth_user_decorator_1.AuthUser())
    ], DashboardController.prototype, "getGraphBankingStatistics");
    __decorate([
        common_1.Get('admin-widgets-statistics'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: dashboard_widgets_dto_1.DashboardWidgetsDto
        }),
        roles_decorator_1.Roles(role_1.Role.admin)
    ], DashboardController.prototype, "getAdminWidgetsStatistics");
    __decorate([
        common_1.Get('consortium-widgets-statistics'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: dashboard_widgets_dto_1.DashboardWidgetsDto
        }),
        roles_decorator_1.Roles(role_1.Role.consortium),
        __param(0, auth_user_decorator_1.AuthUser())
    ], DashboardController.prototype, "getConsortiumWidgetsStatistics");
    __decorate([
        common_1.Get('banking-widgets-statistics'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: dashboard_widgets_dto_1.DashboardWidgetsDto
        }),
        roles_decorator_1.Roles(role_1.Role.banker),
        __param(0, auth_user_decorator_1.AuthUser())
    ], DashboardController.prototype, "getBankingWidgetsStatistics");
    __decorate([
        common_1.Get('webuser-widgets-statistics'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: dashboard_widgets_dto_1.DashboardWidgetsDto
        }),
        roles_decorator_1.Roles(role_1.Role.webuser),
        __param(0, auth_user_decorator_1.AuthUser())
    ], DashboardController.prototype, "getWebUserWidgetsStatistics");
    __decorate([
        common_1.Get('banking-played-numbers-statistics'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: dashboard_played_numbers_dto_1.DashboardPlayedNumbersDto
        }),
        roles_decorator_1.Roles(role_1.Role.banker),
        __param(0, auth_user_decorator_1.AuthUser())
    ], DashboardController.prototype, "getBankingPlayedNumbersStatistics");
    __decorate([
        common_1.Get('consortium-played-numbers-statistics'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: dashboard_played_numbers_dto_1.DashboardPlayedNumbersDto
        }),
        roles_decorator_1.Roles(role_1.Role.consortium),
        __param(0, auth_user_decorator_1.AuthUser())
    ], DashboardController.prototype, "getConsortiumPlayedNumbersStatistics");
    __decorate([
        common_1.Get('graph-banking-balance-statistics'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: dashboard_graph_balance_banking_dto_1.DashboardGraphBalanceBankingDto
        }),
        roles_decorator_1.Roles(role_1.Role.banker),
        __param(0, auth_user_decorator_1.AuthUser())
    ], DashboardController.prototype, "getGraphBankingBalanceStatistics");
    __decorate([
        common_1.Get('graph-consortium-banking-balance-statistics'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: dashboard_graph_consortium_balance_banking_dto_1.DashboardGraphConsortiumBalanceBankingDto
        }),
        roles_decorator_1.Roles(role_1.Role.consortium),
        __param(0, auth_user_decorator_1.AuthUser())
    ], DashboardController.prototype, "getGraphConsortiumBankingBalanceStatistics");
    DashboardController = __decorate([
        swagger_1.ApiTags('dashboard'),
        common_1.Controller('dashboard'),
        common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard)
    ], DashboardController);
    return DashboardController;
}());
exports.DashboardController = DashboardController;
