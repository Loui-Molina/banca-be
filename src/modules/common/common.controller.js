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
exports.CommonController = void 0;
var common_1 = require("@nestjs/common");
var auth_user_decorator_1 = require("@common/decorators/auth.user.decorator");
var passport_1 = require("@nestjs/passport");
var swagger_1 = require("@nestjs/swagger");
var roles_guard_1 = require("@auth/guards/roles.guard");
var const_app_1 = require("@utils/const.app");
var CommonController = /** @class */ (function () {
    function CommonController(commonService) {
        this.commonService = commonService;
    }
    CommonController.prototype.getEstablishmentName = function (user) {
        return this.commonService.getEstablishmentName(user);
    };
    __decorate([
        common_1.Get('/establishment-name'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: String
        }),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, auth_user_decorator_1.AuthUser())
    ], CommonController.prototype, "getEstablishmentName");
    CommonController = __decorate([
        swagger_1.ApiTags('common'),
        common_1.Controller('common'),
        common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard)
    ], CommonController);
    return CommonController;
}());
exports.CommonController = CommonController;
