"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChangeOldPasswordDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var ChangeOldPasswordDto = /** @class */ (function () {
    function ChangeOldPasswordDto() {
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsMongoId()
    ], ChangeOldPasswordDto.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty({ type: String }),
        class_validator_1.IsString(),
        class_validator_1.MinLength(8),
        class_validator_1.MaxLength(35)
    ], ChangeOldPasswordDto.prototype, "oldPassword");
    __decorate([
        swagger_1.ApiProperty({ type: String }),
        class_validator_1.IsString(),
        class_validator_1.MinLength(8),
        class_validator_1.MaxLength(35)
    ], ChangeOldPasswordDto.prototype, "newPassword");
    __decorate([
        swagger_1.ApiProperty({ type: String }),
        class_validator_1.IsString(),
        class_validator_1.MinLength(8),
        class_validator_1.MaxLength(35)
    ], ChangeOldPasswordDto.prototype, "verifyPassword");
    return ChangeOldPasswordDto;
}());
exports.ChangeOldPasswordDto = ChangeOldPasswordDto;
