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
exports.SubscriptionSchema = exports.Subscriptions = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose = require("mongoose");
var Payment = /** @class */ (function (_super) {
    __extends(Payment, _super);
    function Payment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        mongoose_1.Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    ], Payment.prototype, "creationUserId");
    __decorate([
        mongoose_1.Prop()
    ], Payment.prototype, "deletionDate");
    __decorate([
        mongoose_1.Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    ], Payment.prototype, "modificationUserId");
    return Payment;
}(mongoose.Document));
// TODO CRONJOB THAT CHECK PAYMENTS AND UPDATES DUE AMOUNT, IMPLEMENT FEES
var Subscriptions = /** @class */ (function (_super) {
    __extends(Subscriptions, _super);
    function Subscriptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        mongoose_1.Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    ], Subscriptions.prototype, "creationUserId");
    __decorate([
        mongoose_1.Prop()
    ], Subscriptions.prototype, "deletionDate");
    __decorate([
        mongoose_1.Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    ], Subscriptions.prototype, "modificationUserId");
    Subscriptions = __decorate([
        mongoose_1.Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
    ], Subscriptions);
    return Subscriptions;
}(mongoose.Document));
exports.Subscriptions = Subscriptions;
exports.SubscriptionSchema = mongoose_1.SchemaFactory.createForClass(Subscriptions);
