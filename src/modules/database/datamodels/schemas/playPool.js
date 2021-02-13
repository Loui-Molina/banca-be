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
exports.PlayPoolSchema = exports.PlayPool = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose = require("mongoose");
var mongoose_2 = require("mongoose");
var swagger_1 = require("@nestjs/swagger");
var play_types_1 = require("@database/datamodels/enums/play.types");
var play_numbers_1 = require("@database/datamodels/schemas/play.numbers");
var PlayPool = /** @class */ (function (_super) {
    __extends(PlayPool, _super);
    function PlayPool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        swagger_1.ApiProperty()
    ], PlayPool.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty({ type: String, "enum": play_types_1.PlayTypes }),
        mongoose_1.Prop({ required: true, type: String })
    ], PlayPool.prototype, "playType");
    __decorate([
        swagger_1.ApiProperty({ type: play_numbers_1.PlayNumbers }),
        mongoose_1.Prop({ required: true, type: play_numbers_1.PlayNumbersSchema })
    ], PlayPool.prototype, "playNumbers");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ required: true, type: mongoose.SchemaTypes.ObjectId })
    ], PlayPool.prototype, "lotteryId");
    __decorate([
        swagger_1.ApiProperty({ type: Number }),
        mongoose_1.Prop({ required: true })
    ], PlayPool.prototype, "amount");
    __decorate([
        swagger_1.ApiProperty({ type: Date }),
        mongoose_1.Prop({ immutable: true })
    ], PlayPool.prototype, "date");
    PlayPool = __decorate([
        mongoose_1.Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
    ], PlayPool);
    return PlayPool;
}(mongoose_2.Document));
exports.PlayPool = PlayPool;
exports.PlayPoolSchema = mongoose_1.SchemaFactory.createForClass(PlayPool);
