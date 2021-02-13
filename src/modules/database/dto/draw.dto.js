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
exports.DrawDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var draw_1 = require("@database/datamodels/schemas/draw");
var DrawDto = /** @class */ (function (_super) {
    __extends(DrawDto, _super);
    function DrawDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DrawDto;
}(swagger_1.PartialType(draw_1.Draw)));
exports.DrawDto = DrawDto;
