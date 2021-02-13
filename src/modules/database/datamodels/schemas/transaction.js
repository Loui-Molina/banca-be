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
exports.TransactionSchema = exports.Transaction = void 0;
var transaction_type_1 = require("@database/datamodels/enums/transaction.type");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose = require("mongoose");
var mongoose_2 = require("mongoose");
var swagger_1 = require("@nestjs/swagger");
var transaction_objects_1 = require("@database/datamodels/enums/transaction.objects");
var Transaction = /** @class */ (function (_super) {
    __extends(Transaction, _super);
    function Transaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        swagger_1.ApiProperty()
    ], Transaction.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty()
    ], Transaction.prototype, "createdAt");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ required: true })
    ], Transaction.prototype, "amount");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ required: true })
    ], Transaction.prototype, "description");
    __decorate([
        swagger_1.ApiProperty({ type: String, "enum": transaction_type_1.TransactionType }),
        mongoose_1.Prop({ type: String, "enum": transaction_type_1.TransactionType })
    ], Transaction.prototype, "type");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ required: true })
    ], Transaction.prototype, "lastBalance");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ required: true })
    ], Transaction.prototype, "actualBalance");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ required: false, type: mongoose.SchemaTypes.ObjectId })
    ], Transaction.prototype, "originId");
    __decorate([
        swagger_1.ApiProperty({ type: String, "enum": transaction_objects_1.TransactionObjects }),
        mongoose_1.Prop({ type: String, "enum": transaction_objects_1.TransactionObjects })
    ], Transaction.prototype, "originObject");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ required: false, type: mongoose.SchemaTypes.ObjectId })
    ], Transaction.prototype, "destinationId");
    __decorate([
        swagger_1.ApiProperty({ type: String, "enum": transaction_objects_1.TransactionObjects }),
        mongoose_1.Prop({ type: String, "enum": transaction_objects_1.TransactionObjects })
    ], Transaction.prototype, "destinationObject");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    ], Transaction.prototype, "creationUserId");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop()
    ], Transaction.prototype, "deletionDate");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    ], Transaction.prototype, "modificationUserId");
    Transaction = __decorate([
        mongoose_1.Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
    ], Transaction);
    return Transaction;
}(mongoose_2.Document));
exports.Transaction = Transaction;
exports.TransactionSchema = mongoose_1.SchemaFactory.createForClass(Transaction);
