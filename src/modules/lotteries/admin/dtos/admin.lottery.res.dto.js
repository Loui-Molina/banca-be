"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminLotteryResDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var days_1 = require("@database/datamodels/enums/days");
var lottery_1 = require("@database/datamodels/schemas/lottery");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var result_dto_1 = require("@database/dto/result.dto");
var AdminLotteryResDto = /** @class */ (function (_super) {
    __extends(AdminLotteryResDto, _super);
    function AdminLotteryResDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsMongoId(),
        class_validator_1.IsOptional()
    ], AdminLotteryResDto.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], AdminLotteryResDto.prototype, "name");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], AdminLotteryResDto.prototype, "nickname");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsHexColor()
    ], AdminLotteryResDto.prototype, "color");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], AdminLotteryResDto.prototype, "playTime");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsBoolean()
    ], AdminLotteryResDto.prototype, "status");
    __decorate([
        swagger_1.ApiProperty({ type: result_dto_1.ResultDto, isArray: true }),
        class_validator_1.IsOptional(),
        class_validator_1.IsArray(),
        class_transformer_1.Type(function () { return result_dto_1.ResultDto; })
    ], AdminLotteryResDto.prototype, "results");
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], AdminLotteryResDto.prototype, "openTime");
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], AdminLotteryResDto.prototype, "closeTime");
    __decorate([
        swagger_1.ApiProperty({ type: Number, "enum": days_1.Days, isArray: true }),
        class_validator_1.IsEnum(days_1.Days)
    ], AdminLotteryResDto.prototype, "day");
    return AdminLotteryResDto;
}(swagger_1.PartialType(lottery_1.Lottery)));
exports.AdminLotteryResDto = AdminLotteryResDto;
