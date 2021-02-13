"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
exports.WebUsersService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var web_user_1 = require("@database/datamodels/schemas/web.user");
var role_1 = require("@database/datamodels/enums/role");
var banking_1 = require("@database/datamodels/schemas/banking");
var WebUsersService = /** @class */ (function () {
    function WebUsersService(usersService, webUserModel, bankingModel, userAuthService, consortiumService, bankingService) {
        this.usersService = usersService;
        this.webUserModel = webUserModel;
        this.bankingModel = bankingModel;
        this.userAuthService = userAuthService;
        this.consortiumService = consortiumService;
        this.bankingService = bankingService;
    }
    WebUsersService.prototype.findAll = function (loggedUser) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var webUsers, webUsersDto, webUsers_1, webUsers_1_1, webUser, _b, _c, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.webUserModel.find().exec()];
                    case 1:
                        webUsers = _d.sent();
                        webUsersDto = [];
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 8, 9, 14]);
                        webUsers_1 = __asyncValues(webUsers);
                        _d.label = 3;
                    case 3: return [4 /*yield*/, webUsers_1.next()];
                    case 4:
                        if (!(webUsers_1_1 = _d.sent(), !webUsers_1_1.done)) return [3 /*break*/, 7];
                        webUser = webUsers_1_1.value;
                        _c = (_b = webUsersDto).push;
                        return [4 /*yield*/, this.mapWebUser(webUser)];
                    case 5:
                        _c.apply(_b, [_d.sent()]);
                        _d.label = 6;
                    case 6: return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _d.trys.push([9, , 12, 13]);
                        if (!(webUsers_1_1 && !webUsers_1_1.done && (_a = webUsers_1["return"]))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _a.call(webUsers_1)];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/, webUsersDto];
                }
            });
        });
    };
    WebUsersService.prototype.getFiltered = function (field, value, loggedUser) {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function () {
            var webUsers, webUsersDto, webUsers_2, webUsers_2_1, webUser, _b, _c, e_2_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.webUserModel.find().exec()];
                    case 1:
                        webUsers = _d.sent();
                        webUsersDto = [];
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 8, 9, 14]);
                        webUsers_2 = __asyncValues(webUsers);
                        _d.label = 3;
                    case 3: return [4 /*yield*/, webUsers_2.next()];
                    case 4:
                        if (!(webUsers_2_1 = _d.sent(), !webUsers_2_1.done)) return [3 /*break*/, 7];
                        webUser = webUsers_2_1.value;
                        _c = (_b = webUsersDto).push;
                        return [4 /*yield*/, this.mapWebUser(webUser)];
                    case 5:
                        _c.apply(_b, [_d.sent()]);
                        _d.label = 6;
                    case 6: return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _d.trys.push([9, , 12, 13]);
                        if (!(webUsers_2_1 && !webUsers_2_1.done && (_a = webUsers_2["return"]))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _a.call(webUsers_2)];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/, webUsersDto];
                }
            });
        });
    };
    WebUsersService.prototype.getSingleFiltered = function (field, value, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.mapWebUser;
                        return [4 /*yield*/, this.webUserModel.findOne().exec()];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    WebUsersService.prototype.create = function (dto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var banking, createdUser, newObject, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bankingModel.findById(dto.webUser.bankingId).exec()];
                    case 1:
                        banking = _a.sent();
                        if (!banking) {
                            throw new common_1.BadRequestException();
                        }
                        //The rol is hardcoded to prevent issues
                        dto.user.role = role_1.Role.webuser;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 8]);
                        return [4 /*yield*/, this.userAuthService.signUp(dto.user, loggedUser)];
                    case 3:
                        createdUser = (_a.sent()).user;
                        newObject = new this.webUserModel({
                            bankingId: banking._id,
                            status: dto.webUser.status,
                            ownerUserId: createdUser._id,
                            creationUserId: loggedUser._id,
                            modificationUserId: loggedUser._id
                        });
                        return [4 /*yield*/, newObject.save()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 5:
                        e_3 = _a.sent();
                        if (!createdUser) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.usersService["delete"](createdUser._id)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: throw new common_1.BadRequestException();
                    case 8: return [2 /*return*/, newObject];
                }
            });
        });
    };
    WebUsersService.prototype.update = function (dto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var banking, webUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bankingModel.findById(dto.webUser.bankingId).exec()];
                    case 1:
                        banking = _a.sent();
                        if (!banking) {
                            throw new common_1.BadRequestException();
                        }
                        return [4 /*yield*/, this.userAuthService.updateUser(dto.user._id, dto.user, loggedUser)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.webUserModel.findById(dto.webUser._id)];
                    case 3:
                        webUser = _a.sent();
                        webUser.status = dto.webUser.status;
                        webUser.bankingId = loggedUser.role === role_1.Role.admin ? banking._id : webUser.bankingId;
                        webUser.modificationUserId = loggedUser._id;
                        return [4 /*yield*/, webUser.save()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, null];
                }
            });
        });
    };
    WebUsersService.prototype["delete"] = function (id, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var webUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.webUserModel.findById(id).exec()];
                    case 1:
                        webUser = _a.sent();
                        /*if (loggedUser.role === Role.consortium) {
                            const consortium = await this.consortiumService.getConsortiumOfUser(loggedUser);
                            if (consortium._id.toString() !== banking.consortiumId.toString()) {
                                //Cant modify a bank that is not yours
                                throw new BadRequestException();
                            }
                        }*/
                        return [4 /*yield*/, this.userAuthService.deleteUser(webUser.ownerUserId)];
                    case 2:
                        /*if (loggedUser.role === Role.consortium) {
                            const consortium = await this.consortiumService.getConsortiumOfUser(loggedUser);
                            if (consortium._id.toString() !== banking.consortiumId.toString()) {
                                //Cant modify a bank that is not yours
                                throw new BadRequestException();
                            }
                        }*/
                        _a.sent();
                        return [2 /*return*/, this.webUserModel.findByIdAndRemove(id).exec()];
                }
            });
        });
    };
    WebUsersService.prototype.getWebUserName = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var webUser, webUserUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSingleFiltered('ownerUserId', loggedUser._id, loggedUser)];
                    case 1:
                        webUser = _a.sent();
                        return [4 /*yield*/, this.usersService.getSingleFiltered('_id', webUser.ownerUserId)];
                    case 2:
                        webUserUser = _a.sent();
                        return [2 /*return*/, webUserUser.name];
                }
            });
        });
    };
    WebUsersService.prototype.mapWebUser = function (webUser) {
        return __awaiter(this, void 0, void 0, function () {
            var webUserUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.getSingleFiltered('_id', webUser.ownerUserId)];
                    case 1:
                        webUserUser = _a.sent();
                        return [2 /*return*/, {
                                _id: webUser._id,
                                status: webUser.status,
                                ownerUserId: webUser.ownerUserId,
                                bankingId: webUser.bankingId,
                                ownerUsername: webUserUser.username,
                                ownerName: webUserUser.name,
                                createdAt: webUser.createdAt,
                                startOfOperation: webUser.startOfOperation
                            }];
                }
            });
        });
    };
    WebUsersService = __decorate([
        common_1.Injectable(),
        __param(1, mongoose_1.InjectModel(web_user_1.WebUser.name)),
        __param(2, mongoose_1.InjectModel(banking_1.Banking.name))
    ], WebUsersService);
    return WebUsersService;
}());
exports.WebUsersService = WebUsersService;
