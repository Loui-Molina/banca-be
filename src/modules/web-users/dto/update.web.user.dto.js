"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateWebUserDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var sign_up_credentials_dto_1 = require("@auth/dtos/sign.up.credentials.dto");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var UpdateWebUserDto = /** @class */ (function () {
    function UpdateWebUserDto() {
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(function () { return sign_up_credentials_dto_1.SignUpCredentialsDto; })
    ], UpdateWebUserDto.prototype, "user");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsObject()
    ], UpdateWebUserDto.prototype, "webUser");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsMongoId(),
        class_validator_1.IsOptional()
    ], UpdateWebUserDto.prototype, "_id");
    return UpdateWebUserDto;
}());
exports.UpdateWebUserDto = UpdateWebUserDto;
