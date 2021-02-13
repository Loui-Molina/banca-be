"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CoreModule = void 0;
var common_1 = require("@nestjs/common");
var bankings_module_1 = require("@bankings/bankings.module");
var consortium_module_1 = require("@consortiums/consortium.module");
var dashboard_module_1 = require("@dashboard/dashboard.module");
var results_module_1 = require("@results/results.module");
var transactions_module_1 = require("@transactions/transactions.module");
var betting_panel_module_1 = require("@betting.panel/betting.panel.module");
var lotteries_module_1 = require("@lotteries/lotteries.module");
var chat_module_1 = require("@chat/chat.module");
var subscriptions_module_1 = require("@subscriptions/subscriptions.module");
var web_users_module_1 = require("@web.users/web.users.module");
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        common_1.Module({
            imports: [
                results_module_1.ResultsModule,
                consortium_module_1.ConsortiumModule,
                betting_panel_module_1.BettingPanelModule,
                transactions_module_1.TransactionsModule,
                dashboard_module_1.DashboardModule,
                bankings_module_1.BankingsModule,
                lotteries_module_1.LotteriesModule,
                chat_module_1.ChatModule,
                web_users_module_1.WebUsersModule,
                subscriptions_module_1.SubscriptionsModule,
            ],
            controllers: [],
            providers: [],
            exports: [
                results_module_1.ResultsModule,
                consortium_module_1.ConsortiumModule,
                betting_panel_module_1.BettingPanelModule,
                transactions_module_1.TransactionsModule,
                dashboard_module_1.DashboardModule,
                bankings_module_1.BankingsModule,
                lotteries_module_1.LotteriesModule,
                chat_module_1.ChatModule,
                web_users_module_1.WebUsersModule,
                subscriptions_module_1.SubscriptionsModule,
            ]
        })
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
