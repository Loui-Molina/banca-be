"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConsortiumUpdateLotteryDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var prize_limit_update_lottery_dto_1 = require("@lotteries/consortium/dtos/prize.limit.update.lottery.dto");
var betting_limit_update_lottery_dto_1 = require("@lotteries/consortium/dtos/betting.limit.update.lottery.dto");
var ConsortiumUpdateLotteryDto = /** @class */ (function () {
    function ConsortiumUpdateLotteryDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsOptional(),
        class_validator_1.IsMongoId()
    ], ConsortiumUpdateLotteryDto.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsOptional(),
        class_validator_1.IsArray()
    ], ConsortiumUpdateLotteryDto.prototype, "bankings");
    __decorate([
        swagger_1.ApiProperty({ isArray: true, required: false, type: betting_limit_update_lottery_dto_1.BettingLimitUpdateLotteryDto }),
        class_validator_1.IsArray(),
        class_transformer_1.Type(function () { return betting_limit_update_lottery_dto_1.BettingLimitUpdateLotteryDto; })
    ], ConsortiumUpdateLotteryDto.prototype, "bettingLimits");
    __decorate([
        swagger_1.ApiProperty({ isArray: true, required: false, type: prize_limit_update_lottery_dto_1.PrizeLimitUpdateLotteryDto }),
        class_validator_1.IsArray(),
        class_transformer_1.Type(function () { return prize_limit_update_lottery_dto_1.PrizeLimitUpdateLotteryDto; })
    ], ConsortiumUpdateLotteryDto.prototype, "prizeLimits");
    return ConsortiumUpdateLotteryDto;
}());
exports.ConsortiumUpdateLotteryDto = ConsortiumUpdateLotteryDto;
