"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardBankingDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var DashboardBankingDto = /** @class */ (function () {
    function DashboardBankingDto() {
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsMongoId()
    ], DashboardBankingDto.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], DashboardBankingDto.prototype, "name");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNumber()
    ], DashboardBankingDto.prototype, "cancelled");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNumber()
    ], DashboardBankingDto.prototype, "expired");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNumber()
    ], DashboardBankingDto.prototype, "claimed");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNumber()
    ], DashboardBankingDto.prototype, "pending");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNumber()
    ], DashboardBankingDto.prototype, "winner");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNumber()
    ], DashboardBankingDto.prototype, "loser");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNumber()
    ], DashboardBankingDto.prototype, "total");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNumber()
    ], DashboardBankingDto.prototype, "profits");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNumber()
    ], DashboardBankingDto.prototype, "prizes");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNumber()
    ], DashboardBankingDto.prototype, "pendingPrizes");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNumber()
    ], DashboardBankingDto.prototype, "balance");
    return DashboardBankingDto;
}());
exports.DashboardBankingDto = DashboardBankingDto;
