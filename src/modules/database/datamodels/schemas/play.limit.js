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
exports.PlayLimitSchema = exports.PlayLimit = void 0;
var dominican_lottery_prizes_1 = require("@database/datamodels/enums/dominican.lottery.prizes");
var us_lottery_prizes_1 = require("@database/datamodels/enums/us.lottery.prizes");
var brasil_prizes_1 = require("@database/datamodels/enums/brasil.prizes");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose = require("mongoose");
var mongoose_2 = require("mongoose");
// cantidad de veces que se puede hacer una jugada
var PlayLimit = /** @class */ (function (_super) {
    __extends(PlayLimit, _super);
    function PlayLimit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        mongoose_1.Prop({ required: true })
    ], PlayLimit.prototype, "limit");
    __decorate([
        mongoose_1.Prop({
            type: String,
            "enum": [dominican_lottery_prizes_1.DominicanLotteryPrizes, us_lottery_prizes_1.UsLotteryPrizes, brasil_prizes_1.BrasilPrizes]
        })
    ], PlayLimit.prototype, "playType");
    __decorate([
        mongoose_1.Prop()
    ], PlayLimit.prototype, "appliedBankingsIds");
    __decorate([
        mongoose_1.Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    ], PlayLimit.prototype, "creationUserId");
    __decorate([
        mongoose_1.Prop()
    ], PlayLimit.prototype, "deletionDate");
    __decorate([
        mongoose_1.Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    ], PlayLimit.prototype, "modificationUserId");
    PlayLimit = __decorate([
        mongoose_1.Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
    ], PlayLimit);
    return PlayLimit;
}(mongoose_2.Document));
exports.PlayLimit = PlayLimit;
exports.PlayLimitSchema = mongoose_1.SchemaFactory.createForClass(PlayLimit);
