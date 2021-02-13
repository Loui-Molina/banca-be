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
exports.BankingsController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var passport_1 = require("@nestjs/passport");
var const_app_1 = require("@utils/const.app");
var banking_dto_1 = require("@bankings/dto/banking.dto");
var auth_user_decorator_1 = require("@common/decorators/auth.user.decorator");
var banking_1 = require("@database/datamodels/schemas/banking");
var roles_decorator_1 = require("@common/decorators/roles.decorator");
var role_1 = require("@database/datamodels/enums/role");
var roles_guard_1 = require("@auth/guards/roles.guard");
var BankingsController = /** @class */ (function () {
    function BankingsController(bankingService) {
        this.bankingService = bankingService;
    }
    BankingsController.prototype.findAll = function (user) {
        return this.bankingService.findAll(user);
    };
    BankingsController.prototype.findOne = function (field, value, user) {
        return this.bankingService.getFiltered(field, value, user);
    };
    BankingsController.prototype.getUserBanking = function (user) {
        return this.bankingService.getUserBanking(user);
    };
    BankingsController.prototype.create = function (createBankingDto, user) {
        return this.bankingService.create(createBankingDto, user);
    };
    BankingsController.prototype.update = function (updateBankingDto, user) {
        return this.bankingService.update(updateBankingDto, user);
    };
    BankingsController.prototype["delete"] = function (id, user) {
        return this.bankingService["delete"](id, user);
    };
    __decorate([
        common_1.Get(),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: banking_dto_1.BankingDto
        }),
        roles_decorator_1.Roles(role_1.Role.admin, role_1.Role.consortium),
        __param(0, auth_user_decorator_1.AuthUser())
    ], BankingsController.prototype, "findAll");
    __decorate([
        common_1.Get('search'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: banking_dto_1.BankingDto
        }),
        roles_decorator_1.Roles(role_1.Role.admin, role_1.Role.consortium),
        __param(0, common_1.Query('field')), __param(1, common_1.Query('value')), __param(2, auth_user_decorator_1.AuthUser())
    ], BankingsController.prototype, "findOne");
    __decorate([
        common_1.Get('user-banking'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: banking_1.Banking
        }),
        roles_decorator_1.Roles(role_1.Role.banker),
        __param(0, auth_user_decorator_1.AuthUser())
    ], BankingsController.prototype, "getUserBanking");
    __decorate([
        common_1.Post(),
        swagger_1.ApiCreatedResponse({
            description: const_app_1.ConstApp.DEFAULT_POST_OK,
            type: banking_1.Banking
        }),
        roles_decorator_1.Roles(role_1.Role.admin, role_1.Role.consortium),
        __param(0, common_1.Body()), __param(1, auth_user_decorator_1.AuthUser())
    ], BankingsController.prototype, "create");
    __decorate([
        common_1.Put(),
        swagger_1.ApiCreatedResponse({
            description: const_app_1.ConstApp.DEFAULT_PUT_OK,
            type: banking_1.Banking
        }),
        roles_decorator_1.Roles(role_1.Role.admin, role_1.Role.consortium),
        __param(0, common_1.Body()), __param(1, auth_user_decorator_1.AuthUser())
    ], BankingsController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        swagger_1.ApiOkResponse({
            description: const_app_1.ConstApp.DEFAULT_DELETE_OK,
            type: banking_1.Banking
        }),
        roles_decorator_1.Roles(role_1.Role.admin, role_1.Role.consortium),
        __param(0, common_1.Param('id')), __param(1, auth_user_decorator_1.AuthUser())
    ], BankingsController.prototype, "delete");
    BankingsController = __decorate([
        common_1.Controller('banking'),
        swagger_1.ApiTags('banking'),
        common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard)
    ], BankingsController);
    return BankingsController;
}());
exports.BankingsController = BankingsController;
