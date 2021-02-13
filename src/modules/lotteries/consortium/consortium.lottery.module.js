"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConsortiumLotteryModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var lottery_time_1 = require("@database/datamodels/schemas/lottery.time");
var lottery_1 = require("@database/datamodels/schemas/lottery");
var result_1 = require("@database/datamodels/schemas/result");
var draw_1 = require("@database/datamodels/schemas/draw");
var consortium_lottery_service_1 = require("@lotteries/consortium/consortium.lottery.service");
var consortium_lottery_controller_1 = require("@lotteries/consortium/consortium.lottery.controller");
var consortium_lottery_1 = require("@database/datamodels/schemas/consortium.lottery");
var consortium_1 = require("@database/datamodels/schemas/consortium");
var const_app_1 = require("@utils/const.app");
var ConsortiumLotteryModule = /** @class */ (function () {
    function ConsortiumLotteryModule() {
    }
    ConsortiumLotteryModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: lottery_1.Lottery.name, schema: lottery_1.LotterySchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: lottery_time_1.LotteryTime.name, schema: lottery_time_1.LotteryTimeSchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: consortium_lottery_1.ConsortiumLottery.name, schema: consortium_lottery_1.ConsortiumLotterySchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: consortium_1.Consortium.name, schema: consortium_1.ConsortiumSchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: result_1.Result.name, schema: result_1.ResultSchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: draw_1.Draw.name, schema: draw_1.DrawSchema }], const_app_1.ConstApp.BANKING),
            ],
            providers: [consortium_lottery_service_1.ConsortiumLotteryService],
            controllers: [consortium_lottery_controller_1.ConsortiumLotteryController],
            exports: [mongoose_1.MongooseModule]
        })
    ], ConsortiumLotteryModule);
    return ConsortiumLotteryModule;
}());
exports.ConsortiumLotteryModule = ConsortiumLotteryModule;
