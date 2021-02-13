"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.SubscriptionsController = void 0;
var common_1 = require("@nestjs/common");
var auth_user_decorator_1 = require("@common/decorators/auth.user.decorator");
var SubscriptionsController = /** @class */ (function () {
    function SubscriptionsController(subscriptionsService) {
        this.subscriptionsService = subscriptionsService;
    }
    SubscriptionsController.prototype.create = function (createSubscriptionDto) {
        return this.subscriptionsService.create(createSubscriptionDto);
    };
    SubscriptionsController.prototype.findAll = function (q, value) {
        return this.subscriptionsService.find(q, value);
    };
    SubscriptionsController.prototype.findOne = function (q, value) {
        return this.subscriptionsService.findOne(q, value);
    };
    SubscriptionsController.prototype.update = function (updateSubscriptionDto, loggedUser) {
        return this.subscriptionsService.update(updateSubscriptionDto, loggedUser);
    };
    SubscriptionsController.prototype.remove = function (id) {
        return this.subscriptionsService["delete"](id);
    };
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body())
    ], SubscriptionsController.prototype, "create");
    __decorate([
        common_1.Get('all'),
        __param(0, common_1.Query('q')), __param(1, common_1.Query('value'))
    ], SubscriptionsController.prototype, "findAll");
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query('q')), __param(1, common_1.Query('value'))
    ], SubscriptionsController.prototype, "findOne");
    __decorate([
        common_1.Put(),
        __param(0, common_1.Body()), __param(1, auth_user_decorator_1.AuthUser())
    ], SubscriptionsController.prototype, "update");
    __decorate([
        common_1.Delete(),
        __param(0, common_1.Param('id'))
    ], SubscriptionsController.prototype, "remove");
    SubscriptionsController = __decorate([
        common_1.Controller('subscriptions')
    ], SubscriptionsController);
    return SubscriptionsController;
}());
exports.SubscriptionsController = SubscriptionsController;
