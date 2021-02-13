"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.LotteryTimeDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var lottery_time_1 = require("@database/datamodels/schemas/lottery.time");
var LotteryTimeDto = /** @class */ (function (_super) {
    __extends(LotteryTimeDto, _super);
    function LotteryTimeDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LotteryTimeDto;
}(swagger_1.PartialType(lottery_time_1.LotteryTime)));
exports.LotteryTimeDto = LotteryTimeDto;
