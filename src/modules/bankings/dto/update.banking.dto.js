"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateBankingDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var UpdateBankingDto = /** @class */ (function () {
    function UpdateBankingDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ required: true }),
        class_validator_1.IsMongoId()
    ], UpdateBankingDto.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], UpdateBankingDto.prototype, "name");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsBoolean()
    ], UpdateBankingDto.prototype, "status");
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsMongoId(),
        class_validator_1.IsOptional()
    ], UpdateBankingDto.prototype, "ownerUserId");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsOptional(),
        class_validator_1.IsObject() /* FIXME: @ValidateNested() @Type(() => SignInCredentialsDto)*/
    ], UpdateBankingDto.prototype, "user");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsBoolean()
    ], UpdateBankingDto.prototype, "showPercentage");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNumber(),
        class_validator_1.IsOptional()
    ], UpdateBankingDto.prototype, "cancellationTime");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsMongoId()
    ], UpdateBankingDto.prototype, "selectedConsortium");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], UpdateBankingDto.prototype, "header");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], UpdateBankingDto.prototype, "footer");
    return UpdateBankingDto;
}());
exports.UpdateBankingDto = UpdateBankingDto;
