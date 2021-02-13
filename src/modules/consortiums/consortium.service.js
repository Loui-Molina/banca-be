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
exports.ConsortiumService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var consortium_1 = require("@database/datamodels/schemas/consortium");
var role_1 = require("@database/datamodels/enums/role");
var banking_1 = require("@database/datamodels/schemas/banking");
var const_app_1 = require("@utils/const.app");
var ConsortiumService = /** @class */ (function () {
    function ConsortiumService(consortiumModel, bankingModel, userAuthService, userService) {
        this.consortiumModel = consortiumModel;
        this.bankingModel = bankingModel;
        this.userAuthService = userAuthService;
        this.userService = userService;
    }
    ConsortiumService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var consortiums;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.consortiumModel.find({}).exec()];
                    case 1:
                        consortiums = _a.sent();
                        return [2 /*return*/, Promise.all(consortiums.map(function (consortium) { return _this.mapToUser(consortium); }))];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    ConsortiumService.prototype.getFiltered = function (q, value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                return [2 /*return*/, this.consortiumModel.find((_a = {}, _a[q] = value, _a)).exec()];
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    ConsortiumService.prototype.getSingleFiltered = function (q, value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.consortiumModel.find((_a = {}, _a[q] = value, _a)).exec()];
                    case 1: return [2 /*return*/, (_b.sent()).pop()];
                }
            });
        });
    };
    ConsortiumService.prototype.create = function (dto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var createdUser, newObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //CREATE user
                        dto.user.role = role_1.Role.consortium;
                        return [4 /*yield*/, this.userAuthService.signUp(dto.user, loggedUser)];
                    case 1:
                        createdUser = (_a.sent()).user;
                        newObject = new this.consortiumModel({
                            name: dto.name,
                            status: dto.status,
                            ownerUserId: createdUser.id,
                            creationUserId: loggedUser._id,
                            modificationUserId: loggedUser._id
                        });
                        return [4 /*yield*/, newObject.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, newObject];
                }
            });
        });
    };
    ConsortiumService.prototype.update = function (dto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var consortium;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //UPDATE user
                    return [4 /*yield*/, this.userAuthService.updateUser(dto.ownerUserId, dto.user, loggedUser)];
                    case 1:
                        //UPDATE user
                        _a.sent();
                        return [4 /*yield*/, this.consortiumModel.findById(dto._id)];
                    case 2:
                        consortium = _a.sent();
                        consortium.name = dto.name;
                        consortium.status = dto.status;
                        consortium.modificationUserId = loggedUser._id;
                        return [4 /*yield*/, consortium.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, consortium];
                }
            });
        });
    };
    ConsortiumService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var consortium, bankings;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(id)];
                    case 1:
                        consortium = _a.sent();
                        return [4 /*yield*/, this.userAuthService.deleteUser(consortium.ownerUserId)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.bankingModel.find({ consortiumId: consortium._id }).exec()];
                    case 3:
                        bankings = _a.sent();
                        bankings.map(function (banking) {
                            _this.userAuthService.deleteUser(banking.ownerUserId);
                            _this.bankingModel.findByIdAndRemove({ id: banking._id }).exec();
                        });
                        bankings.map(function (banking) {
                            _this.bankingModel.findByIdAndRemove(banking._id).exec();
                        });
                        return [2 /*return*/, this.consortiumModel.findByIdAndRemove(id).exec()];
                }
            });
        });
    };
    ConsortiumService.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.consortiumModel.findById(id).exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ConsortiumService.prototype.mapToUser = function (consortium) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser, bankings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findOne('_id', consortium.ownerUserId)];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser)
                            throw new common_1.BadRequestException(const_app_1.ConstApp.USER_NOT_FOUND);
                        return [4 /*yield*/, this.bankingModel.find({ consortiumId: consortium._id }).exec()];
                    case 2:
                        bankings = _a.sent();
                        if (!bankings)
                            throw new common_1.BadRequestException(const_app_1.ConstApp.ESTABLISHMENT_NOT_FOUND);
                        return [2 /*return*/, {
                                _id: consortium._id,
                                name: consortium.name,
                                startOfOperation: consortium.startOfOperation,
                                status: consortium.status,
                                createdAt: consortium.createdAt,
                                bankings: bankings,
                                ownerId: consortium.ownerUserId,
                                ownerName: foundUser.name,
                                ownerUsername: foundUser.username
                            }];
                }
            });
        });
    };
    // Returns the consortium if the user can modify it
    ConsortiumService.prototype.getConsortiumForUser = function (consortiumId, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var consortium;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(loggedUser.role === role_1.Role.consortium)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getConsortiumOfUser(loggedUser)];
                    case 1:
                        //If is consortiums selects his consortium
                        consortium = _a.sent();
                        if (consortium && consortiumId && consortium._id.toString() !== consortiumId.toString()) {
                            //Doesnt have permission to modify another consortium
                            throw new common_1.BadRequestException();
                        }
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.get(consortiumId.toString())];
                    case 3:
                        //If is admin
                        consortium = _a.sent();
                        if (!consortium) {
                            throw new common_1.BadRequestException();
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/, consortium];
                }
            });
        });
    };
    ConsortiumService.prototype.getConsortiumOfUser = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var consortiums;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.consortiumModel.find({ ownerUserId: loggedUser._id })];
                    case 1:
                        consortiums = _a.sent();
                        if (consortiums.length === 0) {
                            throw new common_1.BadRequestException();
                        }
                        return [2 /*return*/, consortiums.pop()];
                }
            });
        });
    };
    ConsortiumService.prototype.getConsortiumName = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSingleFiltered('ownerUserId', loggedUser._id)];
                    case 1: return [2 /*return*/, (_a.sent()).name];
                }
            });
        });
    };
    ConsortiumService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(consortium_1.Consortium.name)),
        __param(1, mongoose_1.InjectModel(banking_1.Banking.name))
    ], ConsortiumService);
    return ConsortiumService;
}());
exports.ConsortiumService = ConsortiumService;
