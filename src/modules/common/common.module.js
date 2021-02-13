"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommonModule = void 0;
var common_1 = require("@nestjs/common");
var common_service_1 = require("@common.module/common.service");
var common_controller_1 = require("@common.module/common.controller");
var consortium_module_1 = require("@consortiums/consortium.module");
var bankings_module_1 = require("@bankings/bankings.module");
var web_users_module_1 = require("@web.users/web.users.module");
var CommonModule = /** @class */ (function () {
    function CommonModule() {
    }
    CommonModule = __decorate([
        common_1.Module({
            imports: [bankings_module_1.BankingsModule, consortium_module_1.ConsortiumModule, web_users_module_1.WebUsersModule],
            controllers: [common_controller_1.CommonController],
            providers: [common_service_1.CommonService]
        })
    ], CommonModule);
    return CommonModule;
}());
exports.CommonModule = CommonModule;
