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
exports.BetSchema = exports.Bet = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var play_1 = require("@src/modules/database/datamodels/schemas/play");
var mongoose = require("mongoose");
var mongoose_2 = require("mongoose");
var swagger_1 = require("@nestjs/swagger");
var bet_status_1 = require("@database/datamodels/enums/bet.status");
var Bet = /** @class */ (function (_super) {
    __extends(Bet, _super);
    function Bet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.amountWin = 0;
        return _this;
    }
    __decorate([
        swagger_1.ApiProperty()
    ], Bet.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty({ type: [play_1.Play] }),
        mongoose_1.Prop({ immutable: true, type: [play_1.PlaySchema] })
    ], Bet.prototype, "plays");
    __decorate([
        swagger_1.ApiProperty({ type: Date }),
        mongoose_1.Prop({ immutable: true })
    ], Bet.prototype, "date");
    __decorate([
        swagger_1.ApiProperty({ type: String }),
        mongoose_1.Prop({ required: true, immutable: true })
    ], Bet.prototype, "sn");
    __decorate([
        swagger_1.ApiProperty({ type: String, "enum": bet_status_1.BetStatus }),
        mongoose_1.Prop({ required: true, type: String })
    ], Bet.prototype, "betStatus");
    __decorate([
        swagger_1.ApiProperty({ type: Number }),
        mongoose_1.Prop({ required: false })
    ], Bet.prototype, "amountWin");
    __decorate([
        swagger_1.ApiProperty({ type: Date }),
        mongoose_1.Prop({ required: false })
    ], Bet.prototype, "claimDate");
    __decorate([
        mongoose_1.Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    ], Bet.prototype, "creationUserId");
    __decorate([
        swagger_1.ApiProperty({ type: Date }),
        mongoose_1.Prop()
    ], Bet.prototype, "deletionDate");
    __decorate([
        swagger_1.ApiProperty({ type: String }),
        mongoose_1.Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    ], Bet.prototype, "modificationUserId");
    Bet = __decorate([
        mongoose_1.Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
    ], Bet);
    return Bet;
}(mongoose_2.Document));
exports.Bet = Bet;
exports.BetSchema = mongoose_1.SchemaFactory.createForClass(Bet);
