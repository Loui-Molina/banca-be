"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConsortiumDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var ConsortiumDto = /** @class */ (function () {
    function ConsortiumDto() {
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], ConsortiumDto.prototype, "ownerName");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], ConsortiumDto.prototype, "ownerUsername");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsMongoId()
    ], ConsortiumDto.prototype, "ownerId");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsMongoId()
    ], ConsortiumDto.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], ConsortiumDto.prototype, "name");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsDate()
    ], ConsortiumDto.prototype, "createdAt");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsBoolean()
    ], ConsortiumDto.prototype, "status");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsDate()
    ], ConsortiumDto.prototype, "startOfOperation");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsArray(),
        class_validator_1.IsOptional()
    ], ConsortiumDto.prototype, "bankings");
    return ConsortiumDto;
}());
exports.ConsortiumDto = ConsortiumDto;
