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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserSchema = exports.User = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose = require("mongoose");
var mongoose_2 = require("mongoose");
var swagger_1 = require("@nestjs/swagger");
var bcrypt = require("bcrypt");
var user_preference_1 = require("@database/datamodels/schemas/user.preference");
var role_1 = require("@database/datamodels/enums/role");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        swagger_1.ApiProperty()
    ], User.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop()
    ], User.prototype, "lastLogin");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop()
    ], User.prototype, "name");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ unique: true, required: true })
    ], User.prototype, "username");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ required: true, select: false })
    ], User.prototype, "password");
    __decorate([
        swagger_1.ApiProperty({ type: String, "enum": role_1.Role }),
        mongoose_1.Prop({ type: String, "enum": role_1.Role })
    ], User.prototype, "role");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ type: user_preference_1.UserPreferenceSchema })
    ], User.prototype, "preferences");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ select: false, required: true })
    ], User.prototype, "salt");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    ], User.prototype, "creationUserId");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ required: false, type: [String] })
    ], User.prototype, "oldPasswords");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop()
    ], User.prototype, "deletionDate");
    __decorate([
        swagger_1.ApiProperty(),
        mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId })
    ], User.prototype, "modificationUserId");
    User = __decorate([
        mongoose_1.Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
    ], User);
    return User;
}(mongoose_2.Document));
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.methods.validatePassword = function validatePassword(password) {
    return __awaiter(this, void 0, void 0, function () {
        var hash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt.hash(password, this.salt)];
                case 1:
                    hash = _a.sent();
                    return [2 /*return*/, hash === this.password];
            }
        });
    });
};
exports.UserSchema.methods.validateOldPassword = function validateOldPassword(password) {
    return __awaiter(this, void 0, void 0, function () {
        var used, index, oldPassword, hash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    used = false;
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index < this.oldPasswords.length)) return [3 /*break*/, 4];
                    oldPassword = this.oldPasswords[index];
                    return [4 /*yield*/, bcrypt.hash(password, this.salt)];
                case 2:
                    hash = _a.sent();
                    if (hash === oldPassword) {
                        return [2 /*return*/, (used = true)];
                    }
                    used = false;
                    _a.label = 3;
                case 3:
                    index++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, used];
            }
        });
    });
};
