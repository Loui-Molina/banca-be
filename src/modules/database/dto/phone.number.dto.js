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
exports.PhoneNumberDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var phone_number_1 = require("@database/datamodels/schemas/phone.number");
var PhoneNumberDto = /** @class */ (function (_super) {
    __extends(PhoneNumberDto, _super);
    function PhoneNumberDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PhoneNumberDto;
}(swagger_1.PartialType(phone_number_1.PhoneNumber)));
exports.PhoneNumberDto = PhoneNumberDto;
