"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminLotteryReqDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var days_1 = require("@database/datamodels/enums/days");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var result_dto_1 = require("@database/dto/result.dto");
var AdminLotteryReqDto = /** @class */ (function () {
    function AdminLotteryReqDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsMongoId(),
        class_validator_1.IsOptional()
    ], AdminLotteryReqDto.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], AdminLotteryReqDto.prototype, "name");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], AdminLotteryReqDto.prototype, "nickname");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsHexColor()
    ], AdminLotteryReqDto.prototype, "color");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], AdminLotteryReqDto.prototype, "playTime");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsBoolean()
    ], AdminLotteryReqDto.prototype, "status");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsArray(),
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return result_dto_1.ResultDto; })
    ], AdminLotteryReqDto.prototype, "results");
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], AdminLotteryReqDto.prototype, "openTime");
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], AdminLotteryReqDto.prototype, "closeTime");
    __decorate([
        swagger_1.ApiProperty({ type: Number, "enum": days_1.Days, isArray: true }),
        class_validator_1.IsEnum(days_1.Days)
    ], AdminLotteryReqDto.prototype, "day");
    return AdminLotteryReqDto;
}());
exports.AdminLotteryReqDto = AdminLotteryReqDto;
