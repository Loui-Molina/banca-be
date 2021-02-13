"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResumeSellsDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var ResumeSellsDto = /** @class */ (function () {
    function ResumeSellsDto() {
    }
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty()
    ], ResumeSellsDto.prototype, "cancelled");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty()
    ], ResumeSellsDto.prototype, "expired");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty()
    ], ResumeSellsDto.prototype, "claimed");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty()
    ], ResumeSellsDto.prototype, "pending");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty()
    ], ResumeSellsDto.prototype, "winner");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty()
    ], ResumeSellsDto.prototype, "loser");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty()
    ], ResumeSellsDto.prototype, "total");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty()
    ], ResumeSellsDto.prototype, "profits");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty()
    ], ResumeSellsDto.prototype, "prizes");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty()
    ], ResumeSellsDto.prototype, "pendingPrizes");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty()
    ], ResumeSellsDto.prototype, "balance");
    return ResumeSellsDto;
}());
exports.ResumeSellsDto = ResumeSellsDto;
