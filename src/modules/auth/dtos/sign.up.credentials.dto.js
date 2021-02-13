"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignUpCredentialsDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var role_1 = require("@database/datamodels/enums/role");
var class_validator_1 = require("class-validator");
var SignUpCredentialsDto = /** @class */ (function () {
    function SignUpCredentialsDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ type: String }),
        class_validator_1.IsString(),
        class_validator_1.MinLength(4),
        class_validator_1.MaxLength(20)
    ], SignUpCredentialsDto.prototype, "username");
    __decorate([
        swagger_1.ApiProperty({ type: String }),
        class_validator_1.IsOptional() // Solo para el edit
        ,
        class_validator_1.IsString(),
        class_validator_1.MinLength(8),
        class_validator_1.MaxLength(35)
    ], SignUpCredentialsDto.prototype, "password");
    __decorate([
        swagger_1.ApiProperty({ type: String, required: true }),
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], SignUpCredentialsDto.prototype, "name");
    __decorate([
        swagger_1.ApiProperty({ type: String, "enum": role_1.Role, required: false }),
        class_validator_1.IsEnum(role_1.Role),
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], SignUpCredentialsDto.prototype, "role");
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsMongoId(),
        class_validator_1.IsOptional()
    ], SignUpCredentialsDto.prototype, "_id");
    return SignUpCredentialsDto;
}());
exports.SignUpCredentialsDto = SignUpCredentialsDto;
