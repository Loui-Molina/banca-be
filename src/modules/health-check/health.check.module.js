"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HealthCheckModule = void 0;
var common_1 = require("@nestjs/common");
var terminus_1 = require("@nestjs/terminus");
var health_controller_1 = require("@health-check/health.controller");
var HealthCheckModule = /** @class */ (function () {
    function HealthCheckModule() {
    }
    HealthCheckModule = __decorate([
        common_1.Module({
            imports: [terminus_1.TerminusModule],
            controllers: [health_controller_1.HealthController]
        })
    ], HealthCheckModule);
    return HealthCheckModule;
}());
exports.HealthCheckModule = HealthCheckModule;
