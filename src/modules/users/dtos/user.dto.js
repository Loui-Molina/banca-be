"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var role_1 = require("@database/datamodels/enums/role");
var class_validator_1 = require("class-validator");
var UserDto = /** @class */ (function () {
    function UserDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ type: String }),
        class_validator_1.IsMongoId()
    ], UserDto.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty({ type: String }),
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UserDto.prototype, "name");
    __decorate([
        swagger_1.ApiProperty({ type: String }),
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UserDto.prototype, "username");
    __decorate([
        swagger_1.ApiProperty({ type: String, "enum": role_1.Role }),
        class_validator_1.IsEnum(role_1.Role),
        class_validator_1.IsOptional()
    ], UserDto.prototype, "role");
    return UserDto;
}());
exports.UserDto = UserDto;
