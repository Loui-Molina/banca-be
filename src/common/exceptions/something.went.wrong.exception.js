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
exports.SomethingWentWrongException = void 0;
var common_1 = require("@nestjs/common");
var const_app_1 = require("@src/modules/utils/const.app");
var SomethingWentWrongException = /** @class */ (function (_super) {
    __extends(SomethingWentWrongException, _super);
    function SomethingWentWrongException() {
        return _super.call(this, const_app_1.ConstApp.SOMETHING_WRONG_EXCEPTION, common_1.HttpStatus.INTERNAL_SERVER_ERROR) || this;
    }
    return SomethingWentWrongException;
}(common_1.HttpException));
exports.SomethingWentWrongException = SomethingWentWrongException;
