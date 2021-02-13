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
exports.LotterySchema = exports.Lottery = void 0;
var lottery_time_1 = require("@database/datamodels/schemas/lottery.time");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose = require("mongoose");
var mongoose_2 = require("mongoose");
var result_1 = require("@database/datamodels/schemas/result");
var Lottery = /** @class */ (function (_super) {
    __extends(Lottery, _super);
    function Lottery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        mongoose_1.Prop({ required: true })
    ], Lottery.prototype, "name");
    __decorate([
        mongoose_1.Prop({ required: true })
    ], Lottery.prototype, "nickname");
    __decorate([
        mongoose_1.Prop({ required: true })
    ], Lottery.prototype, "color");
    __decorate([
        mongoose_1.Prop()
    ], Lottery.prototype, "logo");
    __decorate([
        mongoose_1.Prop()
    ], Lottery.prototype, "status");
    __decorate([
        mongoose_1.Prop({ type: lottery_time_1.LotteryTimeSchema })
    ], Lottery.prototype, "time");
    __decorate([
        mongoose_1.Prop({ required: true })
    ], Lottery.prototype, "playTime");
    __decorate([
        mongoose_1.Prop()
    ], Lottery.prototype, "lastDraw");
    __decorate([
        mongoose_1.Prop({ type: [result_1.ResultSchema] })
    ], Lottery.prototype, "results");
    __decorate([
        mongoose_1.Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    ], Lottery.prototype, "creationUserId");
    __decorate([
        mongoose_1.Prop()
    ], Lottery.prototype, "deletionDate");
    __decorate([
        mongoose_1.Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    ], Lottery.prototype, "modificationUserId");
    Lottery = __decorate([
        mongoose_1.Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
    ], Lottery);
    return Lottery;
}(mongoose_2.Document));
exports.Lottery = Lottery;
exports.LotterySchema = mongoose_1.SchemaFactory.createForClass(Lottery);
