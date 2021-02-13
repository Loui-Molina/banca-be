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
exports.BlockedNumberSchema = exports.BlockedNumber = void 0;
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var mongoose_2 = require("@nestjs/mongoose");
var BlockedNumber = /** @class */ (function (_super) {
    __extends(BlockedNumber, _super);
    function BlockedNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        mongoose_2.Prop({ required: true })
    ], BlockedNumber.prototype, "number");
    __decorate([
        mongoose_2.Prop()
    ], BlockedNumber.prototype, "position");
    __decorate([
        mongoose_2.Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    ], BlockedNumber.prototype, "creationUserId");
    __decorate([
        mongoose_2.Prop()
    ], BlockedNumber.prototype, "deletionDate");
    __decorate([
        mongoose_2.Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    ], BlockedNumber.prototype, "modificationUserId");
    BlockedNumber = __decorate([
        mongoose_2.Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
    ], BlockedNumber);
    return BlockedNumber;
}(mongoose_1.Document));
exports.BlockedNumber = BlockedNumber;
exports.BlockedNumberSchema = mongoose_2.SchemaFactory.createForClass(BlockedNumber);
