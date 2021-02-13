"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminLotteryModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var admin_lottery_service_1 = require("@lotteries/admin/admin.lottery.service");
var admin_lottery_controller_1 = require("@lotteries/admin/admin.lottery.controller");
var lottery_time_1 = require("@database/datamodels/schemas/lottery.time");
var lottery_1 = require("@database/datamodels/schemas/lottery");
var result_1 = require("@database/datamodels/schemas/result");
var draw_1 = require("@database/datamodels/schemas/draw");
var const_app_1 = require("@utils/const.app");
var AdminLotteryModule = /** @class */ (function () {
    function AdminLotteryModule() {
    }
    AdminLotteryModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: lottery_1.Lottery.name, schema: lottery_1.LotterySchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: lottery_time_1.LotteryTime.name, schema: lottery_time_1.LotteryTimeSchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: result_1.Result.name, schema: result_1.ResultSchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: draw_1.Draw.name, schema: draw_1.DrawSchema }], const_app_1.ConstApp.BANKING),
            ],
            providers: [admin_lottery_service_1.AdminLotteryService],
            controllers: [admin_lottery_controller_1.AdminLotteryController],
            exports: [mongoose_1.MongooseModule]
        })
    ], AdminLotteryModule);
    return AdminLotteryModule;
}());
exports.AdminLotteryModule = AdminLotteryModule;
