"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateBetDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var play_1 = require("@database/datamodels/schemas/play");
var class_validator_1 = require("class-validator");
var CreateBetDto = /** @class */ (function () {
    function CreateBetDto() {
    }
    __decorate([
        class_validator_1.IsMongoId(),
        class_validator_1.IsOptional(),
        swagger_1.ApiProperty({ required: false })
    ], CreateBetDto.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty({ type: [play_1.Play] }),
        class_validator_1.IsArray()
    ], CreateBetDto.prototype, "plays");
    return CreateBetDto;
}());
exports.CreateBetDto = CreateBetDto;
