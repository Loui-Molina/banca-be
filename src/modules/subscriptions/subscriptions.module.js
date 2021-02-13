"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubscriptionsModule = void 0;
var common_1 = require("@nestjs/common");
var subscriptions_service_1 = require("@subscriptions/subscriptions.service");
var subscriptions_controller_1 = require("@subscriptions/subscriptions.controller");
var mongoose_1 = require("@nestjs/mongoose");
var consortium_1 = require("@database/datamodels/schemas/consortium");
var const_app_1 = require("@utils/const.app");
var SubscriptionsModule = /** @class */ (function () {
    function SubscriptionsModule() {
    }
    SubscriptionsModule = __decorate([
        common_1.Module({
            imports: [mongoose_1.MongooseModule.forFeature([{ name: consortium_1.Consortium.name, schema: consortium_1.ConsortiumSchema }], const_app_1.ConstApp.BANKING)],
            controllers: [subscriptions_controller_1.SubscriptionsController],
            providers: [subscriptions_service_1.SubscriptionsService]
        })
    ], SubscriptionsModule);
    return SubscriptionsModule;
}());
exports.SubscriptionsModule = SubscriptionsModule;
