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
exports.WebUsersController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var passport_1 = require("@nestjs/passport");
var const_app_1 = require("@utils/const.app");
var auth_user_decorator_1 = require("@common/decorators/auth.user.decorator");
var roles_decorator_1 = require("@common/decorators/roles.decorator");
var role_1 = require("@database/datamodels/enums/role");
var roles_guard_1 = require("@auth/guards/roles.guard");
var web_user_dto_1 = require("@web.users/dto/web.user.dto");
var web_user_1 = require("@database/datamodels/schemas/web.user");
var WebUsersController = /** @class */ (function () {
    function WebUsersController(webUsersService) {
        this.webUsersService = webUsersService;
    }
    WebUsersController.prototype.findAll = function (user) {
        return this.webUsersService.findAll(user);
    };
    WebUsersController.prototype.findOne = function (field, value, user) {
        return this.webUsersService.getFiltered(field, value, user);
    };
    WebUsersController.prototype.create = function (dto, user) {
        return this.webUsersService.create(dto, user);
    };
    WebUsersController.prototype.update = function (dto, user) {
        return this.webUsersService.update(dto, user);
    };
    WebUsersController.prototype["delete"] = function (id, user) {
        return this.webUsersService["delete"](id, user);
    };
    __decorate([
        common_1.Get(),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: web_user_dto_1.WebUserDto
        }),
        roles_decorator_1.Roles(role_1.Role.admin, role_1.Role.consortium, role_1.Role.banker),
        __param(0, auth_user_decorator_1.AuthUser())
    ], WebUsersController.prototype, "findAll");
    __decorate([
        common_1.Get('search'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: web_user_dto_1.WebUserDto
        }),
        roles_decorator_1.Roles(role_1.Role.admin, role_1.Role.consortium, role_1.Role.banker),
        __param(0, common_1.Query('field')), __param(1, common_1.Query('value')), __param(2, auth_user_decorator_1.AuthUser())
    ], WebUsersController.prototype, "findOne");
    __decorate([
        common_1.Post(),
        swagger_1.ApiCreatedResponse({
            description: const_app_1.ConstApp.DEFAULT_POST_OK,
            type: web_user_1.WebUser
        }),
        roles_decorator_1.Roles(role_1.Role.admin, role_1.Role.consortium, role_1.Role.banker),
        __param(0, common_1.Body()), __param(1, auth_user_decorator_1.AuthUser())
    ], WebUsersController.prototype, "create");
    __decorate([
        common_1.Put(),
        swagger_1.ApiCreatedResponse({
            description: const_app_1.ConstApp.DEFAULT_PUT_OK,
            type: web_user_1.WebUser
        }),
        roles_decorator_1.Roles(role_1.Role.admin, role_1.Role.consortium, role_1.Role.banker),
        __param(0, common_1.Body()), __param(1, auth_user_decorator_1.AuthUser())
    ], WebUsersController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        swagger_1.ApiOkResponse({
            description: const_app_1.ConstApp.DEFAULT_DELETE_OK,
            type: web_user_1.WebUser
        }),
        roles_decorator_1.Roles(role_1.Role.admin, role_1.Role.consortium, role_1.Role.banker),
        __param(0, common_1.Param('id')), __param(1, auth_user_decorator_1.AuthUser())
    ], WebUsersController.prototype, "delete");
    WebUsersController = __decorate([
        common_1.Controller('webusers'),
        swagger_1.ApiTags('webusers'),
        common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard)
    ], WebUsersController);
    return WebUsersController;
}());
exports.WebUsersController = WebUsersController;
