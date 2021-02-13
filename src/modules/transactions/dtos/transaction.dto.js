"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TransactionDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var transaction_type_1 = require("@database/datamodels/enums/transaction.type");
var transaction_objects_1 = require("@database/datamodels/enums/transaction.objects");
var class_validator_1 = require("class-validator");
var TransactionDto = /** @class */ (function () {
    function TransactionDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsMongoId(),
        class_validator_1.IsOptional()
    ], TransactionDto.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty({ type: String, "enum": transaction_type_1.TransactionType, required: false }),
        class_validator_1.IsEnum(transaction_type_1.TransactionType),
        class_validator_1.IsOptional()
    ], TransactionDto.prototype, "type");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsMongoId()
    ], TransactionDto.prototype, "originId");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsMongoId()
    ], TransactionDto.prototype, "destinationId");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsDate()
    ], TransactionDto.prototype, "createdAt");
    __decorate([
        swagger_1.ApiProperty({ type: Number }),
        class_validator_1.IsNumber()
    ], TransactionDto.prototype, "amount");
    __decorate([
        swagger_1.ApiProperty({ type: Number }),
        class_validator_1.IsNumber()
    ], TransactionDto.prototype, "actualBalance");
    __decorate([
        swagger_1.ApiProperty({ type: Number }),
        class_validator_1.IsNumber()
    ], TransactionDto.prototype, "lastBalance");
    __decorate([
        swagger_1.ApiProperty({ type: String, "enum": transaction_objects_1.TransactionObjects }),
        class_validator_1.IsEnum(transaction_objects_1.TransactionObjects)
    ], TransactionDto.prototype, "originObject");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], TransactionDto.prototype, "originName");
    __decorate([
        swagger_1.ApiProperty({ type: String, "enum": transaction_objects_1.TransactionObjects }),
        class_validator_1.IsEnum(transaction_objects_1.TransactionObjects)
    ], TransactionDto.prototype, "destinationObject");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], TransactionDto.prototype, "destinationName");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], TransactionDto.prototype, "description");
    return TransactionDto;
}());
exports.TransactionDto = TransactionDto;
