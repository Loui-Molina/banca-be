"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubscriptionsService = void 0;
var common_1 = require("@nestjs/common");
var SubscriptionsService = /** @class */ (function () {
    function SubscriptionsService() {
    }
    SubscriptionsService.prototype["delete"] = function (id) {
        return Promise.resolve(undefined);
    };
    SubscriptionsService.prototype.get = function (id) {
        return Promise.resolve(undefined);
    };
    SubscriptionsService.prototype.getAll = function (limit, offset) {
        return Promise.resolve(undefined);
    };
    SubscriptionsService.prototype.find = function (q, value) {
        return Promise.resolve([]);
    };
    SubscriptionsService.prototype.findOne = function (q, value) {
        return Promise.resolve(undefined);
    };
    SubscriptionsService.prototype.update = function (dto, loggedUser) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return Promise.resolve(undefined);
    };
    SubscriptionsService.prototype.create = function (dto) {
        return dto;
    };
    SubscriptionsService = __decorate([
        common_1.Injectable()
    ], SubscriptionsService);
    return SubscriptionsService;
}());
exports.SubscriptionsService = SubscriptionsService;
