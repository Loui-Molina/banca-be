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
exports.__esModule = true;
exports.TransactionService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var transaction_1 = require("@database/datamodels/schemas/transaction");
var transaction_type_1 = require("@database/datamodels/enums/transaction.type");
var consortium_1 = require("@database/datamodels/schemas/consortium");
var banking_1 = require("@database/datamodels/schemas/banking");
var transaction_objects_1 = require("@database/datamodels/enums/transaction.objects");
var role_1 = require("@database/datamodels/enums/role");
var const_app_1 = require("@utils/const.app");
var something_went_wrong_exception_1 = require("@common/exceptions/something.went.wrong.exception");
var TransactionService = /** @class */ (function () {
    function TransactionService(transactionModel, consortiumModel, bankingModel, connection, consortiumService) {
        this.transactionModel = transactionModel;
        this.consortiumModel = consortiumModel;
        this.bankingModel = bankingModel;
        this.connection = connection;
        this.consortiumService = consortiumService;
    }
    TransactionService.prototype.getAll = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = loggedUser.role;
                        switch (_a) {
                            case role_1.Role.admin: return [3 /*break*/, 1];
                            case role_1.Role.consortium: return [3 /*break*/, 3];
                            case role_1.Role.banker: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, this.getTransactionByAdmin()];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, this.getTransactionByConsortium(loggedUser)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [4 /*yield*/, this.getTransactionByBanking(loggedUser)];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7: throw new common_1.BadRequestException();
                }
            });
        });
    };
    TransactionService.prototype.getFiltered = function (q, value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                return [2 /*return*/, this.transactionModel.find((_a = {}, _a[q] = value, _a)).exec()];
            });
        });
    };
    TransactionService.prototype.createTransactionAdmin = function (dto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionDestination, session, originObject, destinationObject, originBalance, destinationBalance, transactionOrigin, transactionDestination_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.startSession()];
                    case 1:
                        session = _a.sent();
                        session.startTransaction();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 15, 16, 17]);
                        originObject = void 0;
                        if (!(dto.originObject === transaction_objects_1.TransactionObjects.consortium)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.consortiumModel.findById(dto.originId)];
                    case 3:
                        originObject = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(dto.originObject === transaction_objects_1.TransactionObjects.banking)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.bankingModel.findById(dto.originId)];
                    case 5:
                        originObject = _a.sent();
                        _a.label = 6;
                    case 6:
                        destinationObject = void 0;
                        if (!(dto.destinationObject === transaction_objects_1.TransactionObjects.consortium)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.consortiumModel.findById(dto.destinationId)];
                    case 7:
                        destinationObject = _a.sent();
                        _a.label = 8;
                    case 8:
                        if (!(dto.destinationObject === transaction_objects_1.TransactionObjects.banking)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.bankingModel.findById(dto.destinationId)];
                    case 9:
                        destinationObject = _a.sent();
                        _a.label = 10;
                    case 10:
                        if (!destinationObject || !originObject) {
                            throw new common_1.BadRequestException(const_app_1.ConstApp.DESTINATION_ORIGIN_NOT_FOUND);
                        }
                        return [4 /*yield*/, originObject.calculateBalance()];
                    case 11:
                        originBalance = _a.sent();
                        return [4 /*yield*/, destinationObject.calculateBalance()];
                    case 12:
                        destinationBalance = _a.sent();
                        transactionOrigin = new this.transactionModel({
                            type: transaction_type_1.TransactionType.debit,
                            originObject: dto.originObject,
                            destinationObject: dto.destinationObject,
                            originId: dto.originId,
                            destinationId: dto.destinationId,
                            description: 'Transaccion entre banca y consorcio',
                            amount: dto.amount * -1,
                            creationUserId: loggedUser._id,
                            modificationUserId: loggedUser._id,
                            lastBalance: originBalance,
                            actualBalance: originBalance + dto.amount * -1
                        });
                        transactionDestination_1 = new this.transactionModel({
                            type: transaction_type_1.TransactionType.credit,
                            originObject: dto.originObject,
                            destinationObject: dto.destinationObject,
                            originId: dto.originId,
                            destinationId: dto.destinationId,
                            description: 'Transaccion entre banca y consorcio',
                            amount: dto.amount,
                            creationUserId: loggedUser._id,
                            modificationUserId: loggedUser._id,
                            lastBalance: destinationBalance,
                            actualBalance: destinationBalance + dto.amount
                        });
                        originObject.transactions.push(transactionOrigin);
                        destinationObject.transactions.push(transactionDestination_1);
                        return [4 /*yield*/, originObject.save()];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, destinationObject.save()];
                    case 14:
                        _a.sent();
                        session.commitTransaction();
                        return [3 /*break*/, 17];
                    case 15:
                        error_1 = _a.sent();
                        session.abortTransaction();
                        throw new something_went_wrong_exception_1.SomethingWentWrongException();
                    case 16:
                        session.endSession();
                        return [7 /*endfinally*/];
                    case 17: return [2 /*return*/, transactionDestination];
                }
            });
        });
    };
    TransactionService.prototype.createTransactionConsortium = function (dto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionDestination, originObject, session, consortium, bankings, destinationObject_1, originBalance, destinationBalance, transactionOrigin, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.startSession()];
                    case 1:
                        session = _a.sent();
                        session.startTransaction();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 17, 18, 19]);
                        return [4 /*yield*/, this.consortiumService.getConsortiumOfUser(loggedUser)];
                    case 3:
                        consortium = _a.sent();
                        return [4 /*yield*/, this.bankingModel.find({ consortiumId: consortium._id }).exec()];
                    case 4:
                        bankings = _a.sent();
                        if (!(dto.originObject === transaction_objects_1.TransactionObjects.consortium)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.consortiumModel.findById(dto.originId)];
                    case 5:
                        originObject = _a.sent();
                        if (originObject._id.toString() !== consortium._id.toString()) {
                            throw new common_1.BadRequestException();
                        }
                        _a.label = 6;
                    case 6:
                        if (!(dto.originObject === transaction_objects_1.TransactionObjects.banking)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.bankingModel.findById(dto.originId)];
                    case 7:
                        originObject = _a.sent();
                        if (bankings.filter(function (banking) { return banking._id.toString() === originObject._id.toString(); }).length === 0) {
                            throw new common_1.BadRequestException();
                        }
                        _a.label = 8;
                    case 8:
                        if (!(dto.destinationObject === transaction_objects_1.TransactionObjects.consortium)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.consortiumModel.findById(dto.destinationId)];
                    case 9:
                        destinationObject_1 = _a.sent();
                        if (destinationObject_1._id.toString() !== consortium._id.toString()) {
                            throw new common_1.BadRequestException();
                        }
                        _a.label = 10;
                    case 10:
                        if (!(dto.destinationObject === transaction_objects_1.TransactionObjects.banking)) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.bankingModel.findById(dto.destinationId)];
                    case 11:
                        destinationObject_1 = _a.sent();
                        if (bankings.filter(function (banking) { return banking._id.toString() === destinationObject_1._id.toString(); }).length ===
                            0) {
                            throw new common_1.BadRequestException();
                        }
                        _a.label = 12;
                    case 12:
                        if (!destinationObject_1 || !originObject) {
                            throw new common_1.BadRequestException();
                        }
                        return [4 /*yield*/, originObject.calculateBalance()];
                    case 13:
                        originBalance = _a.sent();
                        return [4 /*yield*/, destinationObject_1.calculateBalance()];
                    case 14:
                        destinationBalance = _a.sent();
                        transactionOrigin = new this.transactionModel({
                            type: transaction_type_1.TransactionType.debit,
                            originObject: dto.originObject,
                            destinationObject: dto.destinationObject,
                            originId: dto.originId,
                            destinationId: dto.destinationId,
                            amount: dto.amount * -1,
                            creationUserId: loggedUser._id,
                            modificationUserId: loggedUser._id,
                            lastBalance: originBalance,
                            actualBalance: originBalance + dto.amount * -1,
                            description: dto.description
                        });
                        transactionDestination = new this.transactionModel({
                            type: transaction_type_1.TransactionType.credit,
                            originObject: dto.originObject,
                            destinationObject: dto.destinationObject,
                            originId: dto.originId,
                            destinationId: dto.destinationId,
                            amount: dto.amount,
                            creationUserId: loggedUser._id,
                            modificationUserId: loggedUser._id,
                            lastBalance: destinationBalance,
                            actualBalance: destinationBalance + dto.amount,
                            description: dto.description
                        });
                        originObject.transactions.push(transactionOrigin);
                        destinationObject_1.transactions.push(transactionDestination);
                        return [4 /*yield*/, originObject.save()];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, destinationObject_1.save()];
                    case 16:
                        _a.sent();
                        session.commitTransaction();
                        return [3 /*break*/, 19];
                    case 17:
                        error_2 = _a.sent();
                        session.abortTransaction();
                        throw new something_went_wrong_exception_1.SomethingWentWrongException();
                    case 18:
                        session.endSession();
                        return [7 /*endfinally*/];
                    case 19: return [2 /*return*/, transactionDestination];
                }
            });
        });
    };
    TransactionService.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transactionModel.findById(id).exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TransactionService.prototype.getTransactionByAdmin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var consortiums, bankings, results, _i, consortiums_1, consortium, _a, _b, _c, bankings_1, banking, _d, _e;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.consortiumModel.find().exec()];
                    case 1:
                        consortiums = _f.sent();
                        return [4 /*yield*/, this.bankingModel.find().exec()];
                    case 2:
                        bankings = _f.sent();
                        results = [];
                        _i = 0, consortiums_1 = consortiums;
                        _f.label = 3;
                    case 3:
                        if (!(_i < consortiums_1.length)) return [3 /*break*/, 6];
                        consortium = consortiums_1[_i];
                        _b = (_a = results).concat;
                        return [4 /*yield*/, Promise.all(consortium.transactions.map(function (transaction) { return _this.mapToDto(transaction); }))];
                    case 4:
                        results = _b.apply(_a, [_f.sent()]);
                        _f.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        _c = 0, bankings_1 = bankings;
                        _f.label = 7;
                    case 7:
                        if (!(_c < bankings_1.length)) return [3 /*break*/, 10];
                        banking = bankings_1[_c];
                        _e = (_d = results).concat;
                        return [4 /*yield*/, Promise.all(banking.transactions.map(function (transaction) { return _this.mapToDto(transaction); }))];
                    case 8:
                        results = _e.apply(_d, [_f.sent()]);
                        _f.label = 9;
                    case 9:
                        _c++;
                        return [3 /*break*/, 7];
                    case 10:
                        results.sort(function (a, b) {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        });
                        return [2 /*return*/, results];
                }
            });
        });
    };
    TransactionService.prototype.getTransactionByConsortium = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var consortiums, consortium, bankings, results, _i, bankings_2, banking, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.consortiumService.getFiltered('ownerUserId', loggedUser._id)];
                    case 1:
                        consortiums = _c.sent();
                        if (consortiums.length === 0) {
                            throw new common_1.BadRequestException();
                        }
                        consortium = consortiums.pop();
                        return [4 /*yield*/, this.bankingModel.find({ consortiumId: consortium._id }).exec()];
                    case 2:
                        bankings = _c.sent();
                        return [4 /*yield*/, Promise.all(consortium.transactions.map(function (transaction) { return _this.mapToDto(transaction); }))];
                    case 3:
                        results = _c.sent();
                        _i = 0, bankings_2 = bankings;
                        _c.label = 4;
                    case 4:
                        if (!(_i < bankings_2.length)) return [3 /*break*/, 7];
                        banking = bankings_2[_i];
                        _b = (_a = results).concat;
                        return [4 /*yield*/, Promise.all(banking.transactions.map(function (transaction) { return _this.mapToDto(transaction); }))];
                    case 5:
                        results = _b.apply(_a, [_c.sent()]);
                        _c.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        results.sort(function (a, b) {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        });
                        return [2 /*return*/, results];
                }
            });
        });
    };
    TransactionService.prototype.getTransactionByBanking = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var bankings, banking, results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bankingModel.find({ ownerUserId: loggedUser._id })];
                    case 1:
                        bankings = _a.sent();
                        if (bankings.length === 0) {
                            throw new common_1.BadRequestException(const_app_1.ConstApp.ESTABLISHMENT_NOT_FOUND);
                        }
                        banking = bankings.pop();
                        return [4 /*yield*/, Promise.all(banking.transactions.map(function (transaction) { return _this.mapToDto(transaction); }))];
                    case 2:
                        results = _a.sent();
                        results.sort(function (a, b) {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        });
                        return [2 /*return*/, results];
                }
            });
        });
    };
    TransactionService.prototype.mapToDto = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, type, amount, lastBalance, actualBalance, originId, destinationId, originObject, destinationObject, createdAt, description, originName, destinationName, consortium, consortium, banking, banking;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = transaction._id, type = transaction.type, amount = transaction.amount, lastBalance = transaction.lastBalance, actualBalance = transaction.actualBalance, originId = transaction.originId, destinationId = transaction.destinationId, originObject = transaction.originObject, destinationObject = transaction.destinationObject, createdAt = transaction.createdAt, description = transaction.description;
                        if (!(transaction.originObject === transaction_objects_1.TransactionObjects.consortium)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.consortiumModel.findById(transaction.originId).exec()];
                    case 1:
                        consortium = _a.sent();
                        if (consortium) {
                            originName = consortium.name;
                        }
                        _a.label = 2;
                    case 2:
                        if (!(transaction.destinationObject === transaction_objects_1.TransactionObjects.consortium)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.consortiumModel.findById(transaction.destinationId).exec()];
                    case 3:
                        consortium = _a.sent();
                        if (consortium) {
                            destinationName = consortium.name;
                        }
                        _a.label = 4;
                    case 4:
                        if (!(transaction.originObject === transaction_objects_1.TransactionObjects.banking)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.bankingModel.findById(transaction.originId).exec()];
                    case 5:
                        banking = _a.sent();
                        if (banking) {
                            originName = banking.name;
                        }
                        _a.label = 6;
                    case 6:
                        if (!(transaction.destinationObject === transaction_objects_1.TransactionObjects.banking)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.bankingModel.findById(transaction.destinationId).exec()];
                    case 7:
                        banking = _a.sent();
                        if (banking) {
                            destinationName = banking.name;
                        }
                        _a.label = 8;
                    case 8: return [2 /*return*/, {
                            _id: _id,
                            type: type,
                            amount: amount,
                            lastBalance: lastBalance,
                            actualBalance: actualBalance,
                            originId: originId,
                            destinationId: destinationId,
                            originObject: originObject,
                            destinationObject: destinationObject,
                            originName: originName,
                            destinationName: destinationName,
                            createdAt: createdAt,
                            description: description
                        }];
                }
            });
        });
    };
    TransactionService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(transaction_1.Transaction.name)),
        __param(1, mongoose_1.InjectModel(consortium_1.Consortium.name)),
        __param(2, mongoose_1.InjectModel(banking_1.Banking.name)),
        __param(3, mongoose_1.InjectConnection(const_app_1.ConstApp.BANKING))
    ], TransactionService);
    return TransactionService;
}());
exports.TransactionService = TransactionService;
