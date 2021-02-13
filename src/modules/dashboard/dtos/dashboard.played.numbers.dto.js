"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardPlayedNumbersDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var played_numbers_dto_1 = require("@dashboard/dtos/played.numbers.dto");
var DashboardPlayedNumbersDto = /** @class */ (function () {
    function DashboardPlayedNumbersDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ type: played_numbers_dto_1.PlayedNumbersDto, isArray: true })
    ], DashboardPlayedNumbersDto.prototype, "numbers");
    return DashboardPlayedNumbersDto;
}());
exports.DashboardPlayedNumbersDto = DashboardPlayedNumbersDto;
