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
exports.ConsortiumLotterySchema = exports.ConsortiumLottery = void 0;
var betting_limit_1 = require("@database/datamodels/schemas/betting.limit");
var prize_limit_1 = require("@database/datamodels/schemas/prize.limit");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose = require("mongoose");
var mongoose_2 = require("mongoose");
var swagger_1 = require("@nestjs/swagger");
var ConsortiumLottery = /** @class */ (function (_super) {
    __extends(ConsortiumLottery, _super);
    function ConsortiumLottery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        swagger_1.ApiProperty()
    ], ConsortiumLottery.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ required: true, type: mongoose.SchemaTypes.ObjectId })
    ], ConsortiumLottery.prototype, "lotteryId");
    __decorate([
        swagger_1.ApiProperty({ isArray: true }),
        mongoose_1.Prop({ required: false, type: [mongoose.SchemaTypes.ObjectId] })
    ], ConsortiumLottery.prototype, "bankingIds");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ type: [betting_limit_1.BettingLimitSchema] })
    ], ConsortiumLottery.prototype, "bettingLimits");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ type: [prize_limit_1.PrizeLimitSchema] })
    ], ConsortiumLottery.prototype, "prizeLimits");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    ], ConsortiumLottery.prototype, "creationUserId");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop()
    ], ConsortiumLottery.prototype, "deletionDate");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    ], ConsortiumLottery.prototype, "modificationUserId");
    ConsortiumLottery = __decorate([
        mongoose_1.Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
    ], ConsortiumLottery);
    return ConsortiumLottery;
}(mongoose_2.Document));
exports.ConsortiumLottery = ConsortiumLottery;
exports.ConsortiumLotterySchema = mongoose_1.SchemaFactory.createForClass(ConsortiumLottery);
