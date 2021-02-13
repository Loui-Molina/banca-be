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
exports.PlayBetDto = void 0;
var play_1 = require("@database/datamodels/schemas/play");
var mapped_types_1 = require("@nestjs/mapped-types");
var PlayBetDto = /** @class */ (function (_super) {
    __extends(PlayBetDto, _super);
    function PlayBetDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PlayBetDto;
}(mapped_types_1.PartialType(play_1.Play)));
exports.PlayBetDto = PlayBetDto;
