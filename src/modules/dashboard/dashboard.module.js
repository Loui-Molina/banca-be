"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var dashboard_service_1 = require("@dashboard/dashboard.service");
var dashboard_controller_1 = require("@dashboard/dashboard.controller");
var consortium_1 = require("@database/datamodels/schemas/consortium");
var banking_1 = require("@database/datamodels/schemas/banking");
var const_app_1 = require("@utils/const.app");
var web_user_1 = require("@database/datamodels/schemas/web.user");
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: consortium_1.Consortium.name, schema: consortium_1.ConsortiumSchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: banking_1.Banking.name, schema: banking_1.BankingSchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: web_user_1.WebUser.name, schema: web_user_1.WebUserSchema }], const_app_1.ConstApp.BANKING),
            ],
            providers: [dashboard_service_1.DashboardService],
            controllers: [dashboard_controller_1.DashboardController],
            exports: [dashboard_service_1.DashboardService, mongoose_1.MongooseModule]
        })
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
