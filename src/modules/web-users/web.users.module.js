"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WebUsersModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var consortium_module_1 = require("@consortiums/consortium.module");
var web_user_1 = require("@database/datamodels/schemas/web.user");
var const_app_1 = require("@utils/const.app");
var web_users_controller_1 = require("@web.users/web.users.controller");
var web_users_service_1 = require("@web.users/web.users.service");
var auth_user_module_1 = require("@auth.user/auth.user.module");
var bankings_module_1 = require("@bankings/bankings.module");
var banking_1 = require("@database/datamodels/schemas/banking");
var WebUsersModule = /** @class */ (function () {
    function WebUsersModule() {
    }
    WebUsersModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: web_user_1.WebUser.name, schema: web_user_1.WebUserSchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: banking_1.Banking.name, schema: banking_1.BankingSchema }], const_app_1.ConstApp.BANKING),
                auth_user_module_1.AuthUserModule,
                consortium_module_1.ConsortiumModule,
                bankings_module_1.BankingsModule,
            ],
            controllers: [web_users_controller_1.WebUsersController],
            providers: [web_users_service_1.WebUsersService],
            exports: [web_users_service_1.WebUsersService]
        })
    ], WebUsersModule);
    return WebUsersModule;
}());
exports.WebUsersModule = WebUsersModule;
