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
exports.BettingLimitSchema = exports.BettingLimit = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose = require("mongoose");
var mongoose_2 = require("mongoose");
var play_types_1 = require("@database/datamodels/enums/play.types");
var swagger_1 = require("@nestjs/swagger");
// Estado y limite de apuesta en cada jugada
var BettingLimit = /** @class */ (function (_super) {
    __extends(BettingLimit, _super);
    function BettingLimit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        swagger_1.ApiProperty({
            required: true,
            type: String,
            "enum": play_types_1.PlayTypes
        }),
        mongoose_1.Prop({
            type: String,
            "enum": play_types_1.PlayTypes
        })
    ], BettingLimit.prototype, "playType");
    __decorate([
        swagger_1.ApiProperty({ required: true }),
        mongoose_1.Prop()
    ], BettingLimit.prototype, "status");
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        mongoose_1.Prop({ required: true })
    ], BettingLimit.prototype, "betAmount");
    __decorate([
        mongoose_1.Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    ], BettingLimit.prototype, "creationUserId");
    __decorate([
        mongoose_1.Prop()
    ], BettingLimit.prototype, "deletionDate");
    __decorate([
        mongoose_1.Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    ], BettingLimit.prototype, "modificationUserId");
    BettingLimit = __decorate([
        mongoose_1.Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
    ], BettingLimit);
    return BettingLimit;
}(mongoose_2.Document));
exports.BettingLimit = BettingLimit;
exports.BettingLimitSchema = mongoose_1.SchemaFactory.createForClass(BettingLimit);
