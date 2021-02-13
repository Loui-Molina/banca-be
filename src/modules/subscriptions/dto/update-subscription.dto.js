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
exports.UpdateSubscriptionDto = void 0;
var mapped_types_1 = require("@nestjs/mapped-types");
var create_subscription_dto_1 = require("@subscriptions/dto/create-subscription.dto");
var UpdateSubscriptionDto = /** @class */ (function (_super) {
    __extends(UpdateSubscriptionDto, _super);
    function UpdateSubscriptionDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateSubscriptionDto;
}(mapped_types_1.PartialType(create_subscription_dto_1.CreateSubscriptionDto)));
exports.UpdateSubscriptionDto = UpdateSubscriptionDto;
