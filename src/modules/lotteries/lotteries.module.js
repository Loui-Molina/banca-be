"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LotteriesModule = void 0;
var common_1 = require("@nestjs/common");
var admin_lottery_module_1 = require("@lotteries/admin/admin.lottery.module");
var banking_lottery_module_1 = require("@lotteries/banking/banking.lottery.module");
var consortium_lottery_module_1 = require("@lotteries/consortium/consortium.lottery.module");
var LotteriesModule = /** @class */ (function () {
    function LotteriesModule() {
    }
    LotteriesModule = __decorate([
        common_1.Module({
            imports: [admin_lottery_module_1.AdminLotteryModule, banking_lottery_module_1.BankingLotteryModule, consortium_lottery_module_1.ConsortiumLotteryModule],
            exports: [admin_lottery_module_1.AdminLotteryModule, banking_lottery_module_1.BankingLotteryModule, consortium_lottery_module_1.ConsortiumLotteryModule]
        })
    ], LotteriesModule);
    return LotteriesModule;
}());
exports.LotteriesModule = LotteriesModule;
