"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TransactionsModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var consortium_module_1 = require("@consortiums/consortium.module");
var transactions_service_1 = require("@transactions/transactions.service");
var transactions_controller_1 = require("@transactions/transactions.controller");
var transaction_1 = require("@database/datamodels/schemas/transaction");
var consortium_1 = require("@database/datamodels/schemas/consortium");
var banking_1 = require("@database/datamodels/schemas/banking");
var const_app_1 = require("@utils/const.app");
var TransactionsModule = /** @class */ (function () {
    function TransactionsModule() {
    }
    TransactionsModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: transaction_1.Transaction.name, schema: transaction_1.TransactionSchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: consortium_1.Consortium.name, schema: consortium_1.ConsortiumSchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: banking_1.Banking.name, schema: banking_1.BankingSchema }], const_app_1.ConstApp.BANKING),
                consortium_module_1.ConsortiumModule,
            ],
            providers: [transactions_service_1.TransactionService],
            controllers: [transactions_controller_1.TransactionController],
            exports: [transactions_service_1.TransactionService, mongoose_1.MongooseModule]
        })
    ], TransactionsModule);
    return TransactionsModule;
}());
exports.TransactionsModule = TransactionsModule;
