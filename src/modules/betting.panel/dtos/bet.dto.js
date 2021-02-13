"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BetDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var bet_status_1 = require("@database/datamodels/enums/bet.status");
var class_validator_1 = require("class-validator");
var play_dto_1 = require("@betting.panel/dtos/play.dto");
var BetDto = /** @class */ (function () {
    function BetDto() {
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsMongoId()
    ], BetDto.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty({ type: [play_dto_1.PlayDto] }),
        class_validator_1.IsObject()
    ], BetDto.prototype, "plays");
    __decorate([
        swagger_1.ApiProperty({ type: String }),
        class_validator_1.IsString()
    ], BetDto.prototype, "sn");
    __decorate([
        swagger_1.ApiProperty({ type: Date }),
        class_validator_1.IsDate()
    ], BetDto.prototype, "date");
    __decorate([
        swagger_1.ApiProperty({ type: Date }),
        class_validator_1.IsDate()
    ], BetDto.prototype, "claimDate");
    __decorate([
        swagger_1.ApiProperty({
            type: String,
            "enum": bet_status_1.BetStatus
        }),
        class_validator_1.IsOptional(),
        class_validator_1.IsObject()
    ], BetDto.prototype, "betStatus");
    __decorate([
        swagger_1.ApiProperty({ type: Number }),
        class_validator_1.IsNumber(),
        class_validator_1.IsOptional()
    ], BetDto.prototype, "amountWin");
    return BetDto;
}());
exports.BetDto = BetDto;
