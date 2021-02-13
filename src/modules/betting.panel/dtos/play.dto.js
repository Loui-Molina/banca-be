"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlayDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var play_types_1 = require("@database/datamodels/enums/play.types");
var play_numbers_dto_1 = require("@database/dto/play.numbers.dto");
var PlayDto = /** @class */ (function () {
    function PlayDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ type: String, "enum": play_types_1.PlayTypes }),
        class_validator_1.IsEnum(play_types_1.PlayTypes)
    ], PlayDto.prototype, "playType");
    __decorate([
        swagger_1.ApiProperty({ type: Number }),
        class_validator_1.IsNumber()
    ], PlayDto.prototype, "amount");
    __decorate([
        swagger_1.ApiProperty({ type: play_numbers_dto_1.PlayNumbersDto }),
        class_validator_1.IsObject() //FIXME ADD VALIDATION TO PlayNumbersDto
    ], PlayDto.prototype, "playNumbers");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsMongoId()
    ], PlayDto.prototype, "lotteryId");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], PlayDto.prototype, "lotteryName");
    return PlayDto;
}());
exports.PlayDto = PlayDto;
