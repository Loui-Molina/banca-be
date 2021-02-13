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
exports.BankingsService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var role_1 = require("@database/datamodels/enums/role");
var banking_1 = require("@database/datamodels/schemas/banking");
var const_app_1 = require("@utils/const.app");
var BankingsService = /** @class */ (function () {
    function BankingsService(usersService, bankingModel, userAuthService, consortiumService) {
        this.usersService = usersService;
        this.bankingModel = bankingModel;
        this.userAuthService = userAuthService;
        this.consortiumService = consortiumService;
    }
    BankingsService.prototype.findAll = function (loggedUser) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var filter, _b, consortium, bankings, bankingsDto, bankings_1, bankings_1_1, banking, _c, _d, e_1_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = loggedUser.role;
                        switch (_b) {
                            case role_1.Role.admin: return [3 /*break*/, 1];
                            case role_1.Role.consortium: return [3 /*break*/, 2];
                        }
                        return [3 /*break*/, 4];
                    case 1:
                        filter = {};
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, this.consortiumService.getConsortiumOfUser(loggedUser)];
                    case 3:
                        consortium = _e.sent();
                        filter = { consortiumId: consortium._id };
                        return [3 /*break*/, 5];
                    case 4: throw new common_1.BadRequestException(const_app_1.ConstApp.UNAUTHORIZED);
                    case 5: return [4 /*yield*/, this.bankingModel.find(filter).exec()];
                    case 6:
                        bankings = _e.sent();
                        bankingsDto = [];
                        _e.label = 7;
                    case 7:
                        _e.trys.push([7, 13, 14, 19]);
                        bankings_1 = __asyncValues(bankings);
                        _e.label = 8;
                    case 8: return [4 /*yield*/, bankings_1.next()];
                    case 9:
                        if (!(bankings_1_1 = _e.sent(), !bankings_1_1.done)) return [3 /*break*/, 12];
                        banking = bankings_1_1.value;
                        _d = (_c = bankingsDto).push;
                        return [4 /*yield*/, this.mapBanking(banking)];
                    case 10:
                        _d.apply(_c, [_e.sent()]);
                        _e.label = 11;
                    case 11: return [3 /*break*/, 8];
                    case 12: return [3 /*break*/, 19];
                    case 13:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 19];
                    case 14:
                        _e.trys.push([14, , 17, 18]);
                        if (!(bankings_1_1 && !bankings_1_1.done && (_a = bankings_1["return"]))) return [3 /*break*/, 16];
                        return [4 /*yield*/, _a.call(bankings_1)];
                    case 15:
                        _e.sent();
                        _e.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 18: return [7 /*endfinally*/];
                    case 19: return [2 /*return*/, bankingsDto];
                }
            });
        });
    };
    BankingsService.prototype.getFiltered = function (field, value, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, _a, consortium, bankings;
            var _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = loggedUser.role;
                        switch (_a) {
                            case role_1.Role.admin: return [3 /*break*/, 1];
                            case role_1.Role.consortium: return [3 /*break*/, 2];
                        }
                        return [3 /*break*/, 4];
                    case 1:
                        filter = (_b = {}, _b[field] = value, _b);
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, this.consortiumService.getConsortiumOfUser(loggedUser)];
                    case 3:
                        consortium = _d.sent();
                        filter = (_c = {}, _c[field] = value, _c.consortiumId = consortium._id, _c);
                        return [3 /*break*/, 5];
                    case 4: throw new common_1.BadRequestException(const_app_1.ConstApp.UNAUTHORIZED);
                    case 5: return [4 /*yield*/, this.bankingModel.find(filter).exec()];
                    case 6:
                        bankings = _d.sent();
                        return [2 /*return*/, Promise.all(bankings
                                .filter(function (banking) { return banking[field] === value; })
                                .map(function (banking) { return _this.mapBanking(banking); }))];
                }
            });
        });
    };
    BankingsService.prototype.getSingleFiltered = function (field, value, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, _a, consortium, banking;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = loggedUser.role;
                        switch (_a) {
                            case role_1.Role.admin: return [3 /*break*/, 1];
                            case role_1.Role.consortium: return [3 /*break*/, 2];
                            case role_1.Role.banker: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        filter = (_b = {}, _b[field] = value, _b);
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, this.consortiumService.getConsortiumOfUser(loggedUser)];
                    case 3:
                        consortium = _e.sent();
                        filter = (_c = {}, _c[field] = value, _c.consortiumId = consortium._id, _c);
                        return [3 /*break*/, 6];
                    case 4:
                        filter = (_d = {}, _d[field] = value, _d.ownerUserId = loggedUser._id, _d);
                        return [3 /*break*/, 6];
                    case 5: throw new common_1.BadRequestException(const_app_1.ConstApp.UNAUTHORIZED);
                    case 6: return [4 /*yield*/, this.bankingModel.findOne(filter).exec()];
                    case 7:
                        banking = _e.sent();
                        return [2 /*return*/, this.mapBanking(banking)];
                }
            });
        });
    };
    BankingsService.prototype.create = function (createBankingDto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var consortium, _a, showPercentage, name, status, earningPercentage, header, footer, cancellationTime, createdUser, newObject, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.consortiumService.getConsortiumForUser(createBankingDto.consortiumId, loggedUser)];
                    case 1:
                        consortium = _b.sent();
                        _a = createBankingDto.banking, showPercentage = _a.showPercentage, name = _a.name, status = _a.status, earningPercentage = _a.earningPercentage, header = _a.header, footer = _a.footer, cancellationTime = _a.cancellationTime;
                        if (!consortium.startOfOperation) {
                            //Inicio de operacion
                            consortium.startOfOperation = new Date();
                        }
                        //The rol is hardcoded to prevent issues
                        createBankingDto.user.role = role_1.Role.banker;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, , 9]);
                        return [4 /*yield*/, this.userAuthService.signUp(createBankingDto.user, loggedUser)];
                    case 3:
                        createdUser = (_b.sent()).user;
                        newObject = new this.bankingModel({
                            name: name,
                            status: status,
                            consortiumId: consortium._id,
                            ownerUserId: createdUser.id,
                            showPercentage: showPercentage,
                            creationUserId: loggedUser._id,
                            modificationUserId: loggedUser._id,
                            earningPercentage: earningPercentage,
                            cancellationTime: cancellationTime,
                            header: header,
                            footer: footer
                        });
                        return [4 /*yield*/, newObject.save()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, consortium.save()];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 6:
                        e_2 = _b.sent();
                        if (!createdUser) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.usersService["delete"](createdUser._id)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8: throw new common_1.BadRequestException(const_app_1.ConstApp.SOMETHING_WRONG_EXCEPTION);
                    case 9: return [2 /*return*/, newObject];
                }
            });
        });
    };
    BankingsService.prototype.update = function (updateBankingDto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var consortium, banking;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.consortiumService.getConsortiumForUser(updateBankingDto.selectedConsortium, loggedUser)];
                    case 1:
                        consortium = _a.sent();
                        //FIXME TRANSACTION
                        return [4 /*yield*/, this.userAuthService.updateUser(updateBankingDto.ownerUserId, updateBankingDto.user, loggedUser)];
                    case 2:
                        //FIXME TRANSACTION
                        _a.sent();
                        return [4 /*yield*/, this.bankingModel.findById(updateBankingDto._id)];
                    case 3:
                        banking = _a.sent();
                        banking.name = updateBankingDto.name;
                        banking.status = updateBankingDto.status;
                        banking.showPercentage = updateBankingDto.showPercentage;
                        banking.cancellationTime = updateBankingDto.cancellationTime;
                        banking.consortiumId = loggedUser.role === role_1.Role.admin ? consortium._id : banking.consortiumId;
                        banking.modificationUserId = loggedUser._id;
                        banking.header = updateBankingDto.header;
                        banking.footer = updateBankingDto.footer;
                        //TODO checkear que el modificatedAt cambie
                        return [4 /*yield*/, banking.save()];
                    case 4:
                        //TODO checkear que el modificatedAt cambie
                        _a.sent();
                        return [2 /*return*/, banking];
                }
            });
        });
    };
    BankingsService.prototype["delete"] = function (id, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var banking, consortium;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bankingModel.findById(id).exec()];
                    case 1:
                        banking = _a.sent();
                        if (!(loggedUser.role === role_1.Role.consortium)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.consortiumService.getConsortiumOfUser(loggedUser)];
                    case 2:
                        consortium = _a.sent();
                        if (consortium._id.toString() !== banking.consortiumId.toString()) {
                            //Cant modify a bank that is not yours
                            throw new common_1.BadRequestException(const_app_1.ConstApp.ESTABLISHMENT_NOT_FOUND);
                        }
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.userAuthService.deleteUser(banking.ownerUserId)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, this.bankingModel.findByIdAndRemove(id).exec()];
                }
            });
        });
    };
    BankingsService.prototype.getBankingName = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSingleFiltered('ownerUserId', loggedUser._id, loggedUser)];
                    case 1: return [2 /*return*/, (_a.sent()).name];
                }
            });
        });
    };
    BankingsService.prototype.mapBanking = function (banking) {
        return __awaiter(this, void 0, void 0, function () {
            var bankingUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.findOne('_id', banking.ownerUserId)];
                    case 1:
                        bankingUser = _a.sent();
                        return [2 /*return*/, {
                                _id: banking._id,
                                consortiumId: banking.consortiumId,
                                createdAt: banking.createdAt,
                                name: banking.name,
                                ownerUserId: banking.ownerUserId,
                                showPercentage: banking.showPercentage,
                                startOfOperation: banking.startOfOperation,
                                status: banking.status,
                                earningPercentage: banking.earningPercentage,
                                ownerUsername: bankingUser ? bankingUser.username : null,
                                ownerName: bankingUser ? bankingUser.name : null,
                                header: banking.header,
                                footer: banking.footer
                            }];
                }
            });
        });
    };
    /**
     * METHODS THAT RETURN THE UNALTERED DOCUMENT
     * DO NOT RETURN THIS TO THE FRONT END
     * ONLY FOR INTERNAL USE
     * */
    BankingsService.prototype.findAllDocuments = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, _a, consortium;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = loggedUser.role;
                        switch (_a) {
                            case role_1.Role.admin: return [3 /*break*/, 1];
                            case role_1.Role.consortium: return [3 /*break*/, 2];
                        }
                        return [3 /*break*/, 4];
                    case 1:
                        filter = {};
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, this.consortiumService.getConsortiumOfUser(loggedUser)];
                    case 3:
                        consortium = _b.sent();
                        filter = { consortiumId: consortium._id };
                        return [3 /*break*/, 5];
                    case 4: throw new common_1.BadRequestException(const_app_1.ConstApp.UNAUTHORIZED);
                    case 5: return [4 /*yield*/, this.bankingModel.find(filter).exec()];
                    case 6: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    BankingsService.prototype.getFilteredDocuments = function (field, value, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, _a, consortium;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = loggedUser.role;
                        switch (_a) {
                            case role_1.Role.admin: return [3 /*break*/, 1];
                            case role_1.Role.consortium: return [3 /*break*/, 2];
                        }
                        return [3 /*break*/, 4];
                    case 1:
                        filter = (_b = {}, _b[field] = value, _b);
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, this.consortiumService.getConsortiumOfUser(loggedUser)];
                    case 3:
                        consortium = _d.sent();
                        filter = (_c = {}, _c[field] = value, _c.consortiumId = consortium._id, _c);
                        return [3 /*break*/, 5];
                    case 4: throw new common_1.BadRequestException(const_app_1.ConstApp.UNAUTHORIZED);
                    case 5: return [4 /*yield*/, this.bankingModel.find(filter).exec()];
                    case 6: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    BankingsService.prototype.getSingleFilteredDocument = function (field, value, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, _a, consortium;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = loggedUser.role;
                        switch (_a) {
                            case role_1.Role.admin: return [3 /*break*/, 1];
                            case role_1.Role.consortium: return [3 /*break*/, 2];
                            case role_1.Role.banker: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        filter = (_b = {}, _b[field] = value, _b);
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, this.consortiumService.getConsortiumOfUser(loggedUser)];
                    case 3:
                        consortium = _e.sent();
                        filter = (_c = {}, _c[field] = value, _c.consortiumId = consortium._id, _c);
                        return [3 /*break*/, 6];
                    case 4:
                        filter = (_d = {}, _d[field] = value, _d.ownerUserId = loggedUser._id, _d);
                        return [3 /*break*/, 6];
                    case 5: throw new common_1.BadRequestException(const_app_1.ConstApp.UNAUTHORIZED);
                    case 6: return [4 /*yield*/, this.bankingModel.find(filter).exec()];
                    case 7: return [2 /*return*/, (_e.sent()).pop()];
                }
            });
        });
    };
    BankingsService.prototype.getUserBanking = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var banking;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(loggedUser.role === role_1.Role.banker)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.bankingModel.findOne({ ownerUserId: loggedUser._id }).exec()];
                    case 1:
                        banking = _a.sent();
                        if (!banking)
                            throw new common_1.BadRequestException(const_app_1.ConstApp.ESTABLISHMENT_NOT_FOUND);
                        return [2 /*return*/, banking];
                    case 2: throw new common_1.BadRequestException(const_app_1.ConstApp.ESTABLISHMENT_NOT_FOUND);
                }
            });
        });
    };
    BankingsService = __decorate([
        common_1.Injectable(),
        __param(1, mongoose_1.InjectModel(banking_1.Banking.name))
    ], BankingsService);
    return BankingsService;
}());
exports.BankingsService = BankingsService;
