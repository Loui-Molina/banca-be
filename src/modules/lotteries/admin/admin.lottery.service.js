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
exports.AdminLotteryService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var lottery_time_1 = require("@database/datamodels/schemas/lottery.time");
var lottery_1 = require("@database/datamodels/schemas/lottery");
var AdminLotteryService = /** @class */ (function () {
    function AdminLotteryService(lotteryModel, lotteryTimeModel) {
        this.lotteryModel = lotteryModel;
        this.lotteryTimeModel = lotteryTimeModel;
    }
    AdminLotteryService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.lotteryModel.aggregate([
                        { $match: {} },
                        {
                            $project: {
                                _id: '$_id',
                                name: '$name',
                                nickname: '$nickname',
                                playTime: '$playTime',
                                color: '$color',
                                results: '$results',
                                creationUserId: '$creationUserId',
                                modificationUserId: '$modificationUserId',
                                status: '$status',
                                openTime: '$time.openTime',
                                closeTime: '$time.closeTime',
                                day: '$time.day'
                            }
                        },
                    ])];
            });
        });
    };
    AdminLotteryService.prototype.getFiltered = function (q, value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                return [2 /*return*/, this.lotteryModel.aggregate([
                        { $match: (_a = {}, _a[q] = value, _a) },
                        {
                            $project: {
                                _id: '$_id',
                                name: '$name',
                                nickname: '$nickname',
                                playTime: '$playTime',
                                color: '$color',
                                results: '$results',
                                creationUserId: '$creationUserId',
                                modificationUserId: '$modificationUserId',
                                status: '$status',
                                openTime: '$time.openTime',
                                closeTime: '$time.closeTime',
                                day: '$time.day'
                            }
                        },
                    ])];
            });
        });
    };
    AdminLotteryService.prototype.create = function (dto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var newLottery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newLottery = new this.lotteryModel({
                            name: dto.name,
                            nickname: dto.nickname,
                            color: dto.color,
                            status: dto.status,
                            playTime: dto.playTime,
                            time: new this.lotteryTimeModel({
                                day: dto.day,
                                openTime: dto.openTime,
                                closeTime: dto.closeTime
                            }),
                            creationUserId: loggedUser.id,
                            modificationUserId: loggedUser.id
                        });
                        return [4 /*yield*/, newLottery.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                _id: newLottery._id,
                                name: newLottery.name,
                                nickname: newLottery.nickname,
                                color: newLottery.color,
                                playTime: newLottery.playTime,
                                status: newLottery.status,
                                results: newLottery.results,
                                openTime: newLottery.time.openTime,
                                closeTime: newLottery.time.closeTime,
                                day: newLottery.time.day
                            }];
                }
            });
        });
    };
    AdminLotteryService.prototype.update = function (dto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var time, foundLottery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        time = new this.lotteryTimeModel({
                            day: dto.day,
                            openTime: dto.openTime,
                            closeTime: dto.closeTime
                        });
                        return [4 /*yield*/, this.lotteryModel.findByIdAndUpdate(dto._id, {
                                name: dto.name,
                                nickname: dto.nickname,
                                color: dto.color,
                                status: dto.status,
                                playTime: dto.playTime,
                                time: time,
                                modificationUserId: loggedUser._id
                            }, {
                                "new": false
                            })];
                    case 1:
                        foundLottery = _a.sent();
                        return [2 /*return*/, {
                                _id: foundLottery._id,
                                name: foundLottery.name,
                                nickname: foundLottery.nickname,
                                color: foundLottery.color,
                                playTime: foundLottery.playTime,
                                status: foundLottery.status,
                                results: foundLottery.results,
                                openTime: foundLottery.time.openTime,
                                closeTime: foundLottery.time.closeTime,
                                day: foundLottery.time.day
                            }];
                }
            });
        });
    };
    AdminLotteryService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lotteryModel.findByIdAndRemove(id).exec()];
                    case 1:
                        promise = _a.sent();
                        console.log("delete response " + promise);
                        return [2 /*return*/, promise];
                }
            });
        });
    };
    AdminLotteryService.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var foundLottery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lotteryModel.findById(id).exec()];
                    case 1:
                        foundLottery = _a.sent();
                        return [2 /*return*/, {
                                _id: foundLottery._id,
                                name: foundLottery.name,
                                nickname: foundLottery.nickname,
                                color: foundLottery.color,
                                playTime: foundLottery.playTime,
                                status: foundLottery.status,
                                results: foundLottery.results,
                                openTime: foundLottery.time.openTime,
                                closeTime: foundLottery.time.closeTime,
                                day: foundLottery.time.day
                            }];
                }
            });
        });
    };
    AdminLotteryService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(lottery_1.Lottery.name)),
        __param(1, mongoose_1.InjectModel(lottery_time_1.LotteryTime.name))
    ], AdminLotteryService);
    return AdminLotteryService;
}());
exports.AdminLotteryService = AdminLotteryService;
