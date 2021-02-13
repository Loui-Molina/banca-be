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
exports.PrizeLimitSchema = exports.PrizeLimit = void 0;
var dominican_lottery_prizes_1 = require("@database/datamodels/enums/dominican.lottery.prizes");
var us_lottery_prizes_1 = require("@database/datamodels/enums/us.lottery.prizes");
var brasil_prizes_1 = require("@database/datamodels/enums/brasil.prizes");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose = require("mongoose");
var mongoose_2 = require("mongoose");
var swagger_1 = require("@nestjs/swagger");
var PrizeLimit = /** @class */ (function (_super) {
    __extends(PrizeLimit, _super);
    // Monto a pagar por cada unidad monetaria al momento de haber un ganador
    function PrizeLimit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        swagger_1.ApiProperty({
            type: String,
            "enum": [
                dominican_lottery_prizes_1.DominicanLotteryPrizes.first,
                dominican_lottery_prizes_1.DominicanLotteryPrizes.second,
                dominican_lottery_prizes_1.DominicanLotteryPrizes.third,
                dominican_lottery_prizes_1.DominicanLotteryPrizes.double,
                dominican_lottery_prizes_1.DominicanLotteryPrizes.pale,
                dominican_lottery_prizes_1.DominicanLotteryPrizes.paleTwoThree,
                dominican_lottery_prizes_1.DominicanLotteryPrizes.triplet,
                dominican_lottery_prizes_1.DominicanLotteryPrizes.twoNumbers,
                dominican_lottery_prizes_1.DominicanLotteryPrizes.superPale,
                us_lottery_prizes_1.UsLotteryPrizes.cashThreeStraight,
                us_lottery_prizes_1.UsLotteryPrizes.cashThreeStraightDoubles,
                us_lottery_prizes_1.UsLotteryPrizes.playFourStraight,
                us_lottery_prizes_1.UsLotteryPrizes.pickFiveStraight,
                us_lottery_prizes_1.UsLotteryPrizes.cashThreeBoxThreeWay,
                us_lottery_prizes_1.UsLotteryPrizes.cashThreeBoxSixWay,
                us_lottery_prizes_1.UsLotteryPrizes.playFourBoxFourWay,
                us_lottery_prizes_1.UsLotteryPrizes.playFourBoxSixWay,
                us_lottery_prizes_1.UsLotteryPrizes.playFourBoxTwelfthWay,
                us_lottery_prizes_1.UsLotteryPrizes.playFourBoxTwentyFourthWay,
                us_lottery_prizes_1.UsLotteryPrizes.pickFiveBoxFifthWay,
                us_lottery_prizes_1.UsLotteryPrizes.pickFiveBoxTenthWay,
                us_lottery_prizes_1.UsLotteryPrizes.pickFiveBoxTwentiethWay,
                us_lottery_prizes_1.UsLotteryPrizes.pickFiveBoxThirtiethWay,
                us_lottery_prizes_1.UsLotteryPrizes.pickFiveBoxSixtiethWay,
                us_lottery_prizes_1.UsLotteryPrizes.pickFiveBoxOneHundredTwentiethWay,
                brasil_prizes_1.BrasilPrizes.singulationOne,
                brasil_prizes_1.BrasilPrizes.singulationTwo,
                brasil_prizes_1.BrasilPrizes.singulationThree,
                brasil_prizes_1.BrasilPrizes.bolitaOne,
                brasil_prizes_1.BrasilPrizes.bolitaTwo,
            ],
            required: false
        }),
        mongoose_1.Prop({
            type: String,
            "enum": [dominican_lottery_prizes_1.DominicanLotteryPrizes, us_lottery_prizes_1.UsLotteryPrizes, brasil_prizes_1.BrasilPrizes]
        })
    ], PrizeLimit.prototype, "playType");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ required: true })
    ], PrizeLimit.prototype, "paymentAmount");
    __decorate([
        swagger_1.ApiProperty({ required: true }),
        mongoose_1.Prop()
    ], PrizeLimit.prototype, "status");
    __decorate([
        mongoose_1.Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    ], PrizeLimit.prototype, "creationUserId");
    __decorate([
        mongoose_1.Prop()
    ], PrizeLimit.prototype, "deletionDate");
    __decorate([
        mongoose_1.Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    ], PrizeLimit.prototype, "modificationUserId");
    PrizeLimit = __decorate([
        mongoose_1.Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
        // Monto a pagar por cada unidad monetaria al momento de haber un ganador
    ], PrizeLimit);
    return PrizeLimit;
}(mongoose_2.Document));
exports.PrizeLimit = PrizeLimit;
exports.PrizeLimitSchema = mongoose_1.SchemaFactory.createForClass(PrizeLimit);
