"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BankingDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var BankingDto = /** @class */ (function () {
    function BankingDto() {
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsMongoId(),
        class_validator_1.IsOptional()
    ], BankingDto.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], BankingDto.prototype, "name");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional()
    ], BankingDto.prototype, "status");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsMongoId(),
        class_validator_1.IsOptional()
    ], BankingDto.prototype, "ownerUserId");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsMongoId(),
        class_validator_1.IsOptional()
    ], BankingDto.prototype, "consortiumId");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], BankingDto.prototype, "ownerUsername");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], BankingDto.prototype, "ownerName");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsDate(),
        class_validator_1.IsOptional()
    ], BankingDto.prototype, "createdAt");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsDate(),
        class_validator_1.IsOptional()
    ], BankingDto.prototype, "startOfOperation");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional()
    ], BankingDto.prototype, "showPercentage");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNumber(),
        class_validator_1.IsOptional()
    ], BankingDto.prototype, "earningPercentage");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNumber(),
        class_validator_1.IsOptional()
    ], BankingDto.prototype, "cancellationTime");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], BankingDto.prototype, "header");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], BankingDto.prototype, "footer");
    return BankingDto;
}());
exports.BankingDto = BankingDto;
