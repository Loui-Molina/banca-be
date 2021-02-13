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
exports.SupervisorSchema = exports.Supervisor = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose = require("mongoose");
var Supervisor = /** @class */ (function (_super) {
    __extends(Supervisor, _super); /*implements DataObject*/
    function Supervisor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        mongoose_1.Prop({ required: true })
    ], Supervisor.prototype, "userId");
    __decorate([
        mongoose_1.Prop()
    ], Supervisor.prototype, "bankingIds");
    __decorate([
        mongoose_1.Prop({ required: true, immutable: true })
    ], Supervisor.prototype, "creationUserId");
    __decorate([
        mongoose_1.Prop()
    ], Supervisor.prototype, "deletionDate");
    __decorate([
        mongoose_1.Prop({ required: true })
    ], Supervisor.prototype, "modificationUserId");
    Supervisor = __decorate([
        mongoose_1.Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
    ], Supervisor);
    return Supervisor;
}(mongoose.Document /*implements DataObject*/));
exports.Supervisor = Supervisor;
exports.SupervisorSchema = mongoose_1.SchemaFactory.createForClass(Supervisor);
