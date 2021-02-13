"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BettingPanelModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var users_module_1 = require("@users/users.module");
var auth_user_module_1 = require("@auth.user/auth.user.module");
var banking_1 = require("@database/datamodels/schemas/banking");
var bet_1 = require("@database/datamodels/schemas/bet");
var betting_panel_service_1 = require("@betting.panel/betting.panel.service");
var betting_panel_controller_1 = require("@betting.panel/betting.panel.controller");
var const_app_1 = require("@utils/const.app");
var bankings_module_1 = require("@bankings/bankings.module");
var transaction_1 = require("@database/datamodels/schemas/transaction");
var lottery_1 = require("@database/datamodels/schemas/lottery");
var playPool_1 = require("@database/datamodels/schemas/playPool");
var banking_lottery_module_1 = require("@lotteries/banking/banking.lottery.module");
var banking_lottery_service_1 = require("@lotteries/banking/banking.lottery.service");
var BettingPanelModule = /** @class */ (function () {
    function BettingPanelModule() {
    }
    BettingPanelModule = __decorate([
        common_1.Module({
            imports: [
                users_module_1.UsersModule,
                auth_user_module_1.AuthUserModule,
                bankings_module_1.BankingsModule,
                banking_lottery_module_1.BankingLotteryModule,
                mongoose_1.MongooseModule.forFeature([{ name: transaction_1.Transaction.name, schema: transaction_1.TransactionSchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: lottery_1.Lottery.name, schema: lottery_1.LotterySchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: bet_1.Bet.name, schema: bet_1.BetSchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: banking_1.Banking.name, schema: banking_1.BankingSchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: playPool_1.PlayPool.name, schema: playPool_1.PlayPoolSchema }], const_app_1.ConstApp.BANKING),
            ],
            providers: [betting_panel_service_1.BettingPanelService, banking_lottery_service_1.BankingLotteryService],
            controllers: [betting_panel_controller_1.BettingPanelController],
            exports: [betting_panel_service_1.BettingPanelService]
        })
    ], BettingPanelModule);
    return BettingPanelModule;
}());
exports.BettingPanelModule = BettingPanelModule;
