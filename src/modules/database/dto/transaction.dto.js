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
exports.TransactionDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var transaction_1 = require("@database/datamodels/schemas/transaction");
var TransactionDto = /** @class */ (function (_super) {
    __extends(TransactionDto, _super);
    function TransactionDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TransactionDto;
}(swagger_1.PartialType(transaction_1.Transaction)));
exports.TransactionDto = TransactionDto;
