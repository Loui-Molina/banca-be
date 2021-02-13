"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WebUserDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var WebUserDto = /** @class */ (function () {
    function WebUserDto() {
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsMongoId(),
        class_validator_1.IsOptional()
    ], WebUserDto.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional()
    ], WebUserDto.prototype, "status");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsMongoId(),
        class_validator_1.IsOptional()
    ], WebUserDto.prototype, "ownerUserId");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsMongoId(),
        class_validator_1.IsOptional()
    ], WebUserDto.prototype, "bankingId");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], WebUserDto.prototype, "ownerUsername");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], WebUserDto.prototype, "ownerName");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsDate(),
        class_validator_1.IsOptional()
    ], WebUserDto.prototype, "createdAt");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsDate(),
        class_validator_1.IsOptional()
    ], WebUserDto.prototype, "startOfOperation");
    return WebUserDto;
}());
exports.WebUserDto = WebUserDto;
