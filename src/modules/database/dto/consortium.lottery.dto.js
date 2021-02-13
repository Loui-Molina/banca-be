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
exports.ConsortiumLotteryDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var consortium_lottery_1 = require("@database/datamodels/schemas/consortium.lottery");
var ConsortiumLotteryDto = /** @class */ (function (_super) {
    __extends(ConsortiumLotteryDto, _super);
    function ConsortiumLotteryDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ConsortiumLotteryDto;
}(swagger_1.PartialType(consortium_lottery_1.ConsortiumLottery)));
exports.ConsortiumLotteryDto = ConsortiumLotteryDto;
