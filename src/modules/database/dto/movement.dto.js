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
exports.MovementDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var movement_1 = require("@database/datamodels/schemas/movement");
var MovementDto = /** @class */ (function (_super) {
    __extends(MovementDto, _super);
    function MovementDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MovementDto;
}(swagger_1.PartialType(movement_1.Movement)));
exports.MovementDto = MovementDto;
