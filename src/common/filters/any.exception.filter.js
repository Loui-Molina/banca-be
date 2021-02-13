"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AnyExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var AnyExceptionFilter = /** @class */ (function () {
    function AnyExceptionFilter() {
        this.logger = new common_1.Logger(AnyExceptionFilter_1.name);
    }
    AnyExceptionFilter_1 = AnyExceptionFilter;
    AnyExceptionFilter.prototype["catch"] = function (error, host) {
        var response = host.switchToHttp().getResponse();
        var status = error instanceof common_1.HttpException ? error.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(status).json({
            message: error.message,
            statusCode: status
        });
        this.logger.error(response + error.stack);
    };
    var AnyExceptionFilter_1;
    AnyExceptionFilter = AnyExceptionFilter_1 = __decorate([
        common_1.Catch()
    ], AnyExceptionFilter);
    return AnyExceptionFilter;
}());
exports.AnyExceptionFilter = AnyExceptionFilter;
