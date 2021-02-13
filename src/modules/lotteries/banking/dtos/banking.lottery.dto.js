"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BankingLotteryDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var days_1 = require("@database/datamodels/enums/days");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var betting_limit_dto_1 = require("@database/dto/betting.limit.dto");
var prize_limit_dto_1 = require("@database/dto/prize.limit.dto");
var result_dto_1 = require("@database/dto/result.dto");
var BankingLotteryDto = /** @class */ (function () {
    function BankingLotteryDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsOptional(),
        class_validator_1.IsMongoId()
    ], BankingLotteryDto.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsOptional(),
        class_validator_1.IsArray()
    ], BankingLotteryDto.prototype, "bankings");
    __decorate([
        swagger_1.ApiProperty({
            isArray: true,
            required: false,
            type: betting_limit_dto_1.BettingLimitDto
        }),
        class_validator_1.IsArray(),
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return betting_limit_dto_1.BettingLimitDto; })
    ], BankingLotteryDto.prototype, "bettingLimits");
    __decorate([
        swagger_1.ApiProperty({
            isArray: true,
            required: false,
            type: prize_limit_dto_1.PrizeLimitDto
        }),
        class_validator_1.IsArray(),
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return prize_limit_dto_1.PrizeLimitDto; })
    ], BankingLotteryDto.prototype, "prizeLimits");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], BankingLotteryDto.prototype, "name");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], BankingLotteryDto.prototype, "nickname");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], BankingLotteryDto.prototype, "color");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], BankingLotteryDto.prototype, "playTime");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNumber()
    ], BankingLotteryDto.prototype, "leftTime");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsBoolean()
    ], BankingLotteryDto.prototype, "status");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsOptional(),
        class_validator_1.IsArray(),
        class_transformer_1.Type(function () { return result_dto_1.ResultDto; })
    ], BankingLotteryDto.prototype, "results");
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], BankingLotteryDto.prototype, "openTime");
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], BankingLotteryDto.prototype, "closeTime");
    __decorate([
        swagger_1.ApiProperty({ type: Number, "enum": days_1.Days, isArray: true }),
        class_validator_1.IsEnum(days_1.Days)
    ], BankingLotteryDto.prototype, "day");
    return BankingLotteryDto;
}());
exports.BankingLotteryDto = BankingLotteryDto;
