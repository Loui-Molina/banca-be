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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RefreshTokenSchema = exports.RefreshToken = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var swagger_1 = require("@nestjs/swagger");
var mongoose = require("mongoose");
var mongoose_2 = require("mongoose");
var RefreshToken = /** @class */ (function (_super) {
    __extends(RefreshToken, _super);
    function RefreshToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        mongoose_1.Prop({ unique: true, type: mongoose.Schema.Types.ObjectId })
    ], RefreshToken.prototype, "userId");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop()
    ], RefreshToken.prototype, "ipAddress");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop()
    ], RefreshToken.prototype, "refreshTokenId");
    RefreshToken = __decorate([
        mongoose_1.Schema({ timestamps: true, collection: 'tokens' })
    ], RefreshToken);
    return RefreshToken;
}(mongoose_2.Document));
exports.RefreshToken = RefreshToken;
exports.RefreshTokenSchema = mongoose_1.SchemaFactory.createForClass(RefreshToken);
