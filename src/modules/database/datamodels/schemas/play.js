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
exports.PlaySchema = exports.Play = void 0;
var play_types_1 = require("@database/datamodels/enums/play.types");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose = require("mongoose");
var mongoose_2 = require("mongoose");
var play_numbers_1 = require("@database/datamodels/schemas/play.numbers");
var swagger_1 = require("@nestjs/swagger");
var Play = /** @class */ (function (_super) {
    __extends(Play, _super);
    function Play() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        swagger_1.ApiProperty({ type: String, "enum": play_types_1.PlayTypes }),
        mongoose_1.Prop({ required: true, type: String })
    ], Play.prototype, "playType");
    __decorate([
        swagger_1.ApiProperty({ type: Number }),
        mongoose_1.Prop({ required: true })
    ], Play.prototype, "amount");
    __decorate([
        swagger_1.ApiProperty({ type: play_numbers_1.PlayNumbers }),
        mongoose_1.Prop({ required: true, type: play_numbers_1.PlayNumbersSchema })
    ], Play.prototype, "playNumbers");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ required: true, type: mongoose.SchemaTypes.ObjectId })
    ], Play.prototype, "lotteryId");
    __decorate([
        mongoose_1.Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    ], Play.prototype, "creationUserId");
    __decorate([
        mongoose_1.Prop()
    ], Play.prototype, "deletionDate");
    __decorate([
        mongoose_1.Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    ], Play.prototype, "modificationUserId");
    Play = __decorate([
        mongoose_1.Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
    ], Play);
    return Play;
}(mongoose_2.Document));
exports.Play = Play;
exports.PlaySchema = mongoose_1.SchemaFactory.createForClass(Play);
