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
exports.BankingLotteryService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var lottery_1 = require("@database/datamodels/schemas/lottery");
var consortium_1 = require("@database/datamodels/schemas/consortium");
var banking_1 = require("@database/datamodels/schemas/banking");
var days_1 = require("@database/datamodels/enums/days");
var BankingLotteryService = /** @class */ (function () {
    function BankingLotteryService(lotteryModel, bankingModel, consortiumModel) {
        this.lotteryModel = lotteryModel;
        this.bankingModel = bankingModel;
        this.consortiumModel = consortiumModel;
    }
    BankingLotteryService.prototype.getAll = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var banking, consortium, lotteries, lotteriesDtos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bankingModel.find({ ownerUserId: loggedUser._id })];
                    case 1:
                        banking = (_a.sent()).pop();
                        return [4 /*yield*/, this.consortiumModel.findById(banking.consortiumId)];
                    case 2:
                        consortium = _a.sent();
                        return [4 /*yield*/, this.lotteryModel.aggregate([
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
                    case 3:
                        lotteries = _a.sent();
                        lotteriesDtos = [];
                        lotteries.map(function (lottery) {
                            var consortiumLotterys = consortium.consortiumLotteries.filter(function (item) { return item.lotteryId.toString() === lottery._id.toString(); });
                            if (consortiumLotterys.length > 0) {
                                var consortiumLottery = consortiumLotterys.pop();
                                var flag_1 = false;
                                consortiumLottery.bankingIds.map(function (bankingId) {
                                    if (bankingId.toString() === banking._id.toString()) {
                                        flag_1 = true;
                                    }
                                });
                                if (flag_1) {
                                    var lotteryOpenTime = lottery.openTime.split(':');
                                    var lotteryCloseTime = lottery.closeTime.split(':');
                                    var lotteryPlayTime = lottery.playTime.split(':');
                                    var date = new Date();
                                    var lotteryOpenTimeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(lotteryOpenTime[0]), parseInt(lotteryOpenTime[1]), 0);
                                    var lotteryCloseTimeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(lotteryCloseTime[0]), parseInt(lotteryCloseTime[1]), 0);
                                    var now = new Date();
                                    var leftTime = (lotteryCloseTimeDate.getTime() - now.getTime()) / 1000;
                                    if (!(lotteryOpenTimeDate <= now && lotteryCloseTimeDate >= now)) {
                                        lottery.status = false;
                                        leftTime = 0;
                                    }
                                    var days = lottery.day;
                                    var opened = false;
                                    var nowDay = new Date().getDay();
                                    switch (nowDay) {
                                        case 0:
                                            if (days.includes(days_1.Days.sun)) {
                                                opened = true;
                                            }
                                            break;
                                        case 1:
                                            if (days.includes(days_1.Days.mon)) {
                                                opened = true;
                                            }
                                            break;
                                        case 2:
                                            if (days.includes(days_1.Days.tue)) {
                                                opened = true;
                                            }
                                            break;
                                        case 3:
                                            if (days.includes(days_1.Days.wed)) {
                                                opened = true;
                                            }
                                            break;
                                        case 4:
                                            if (days.includes(days_1.Days.thu)) {
                                                opened = true;
                                            }
                                            break;
                                        case 5:
                                            if (days.includes(days_1.Days.fri)) {
                                                opened = true;
                                            }
                                            break;
                                        case 6:
                                            if (days.includes(days_1.Days.sat)) {
                                                opened = true;
                                            }
                                            break;
                                    }
                                    if (opened) {
                                        lottery.bankings = consortiumLottery.bankingIds;
                                        lottery.prizeLimits = consortiumLottery.prizeLimits;
                                        lottery.bettingLimits = consortiumLottery.bettingLimits;
                                        lottery.leftTime = leftTime;
                                        lotteriesDtos.push(lottery);
                                    }
                                }
                            }
                        });
                        return [2 /*return*/, lotteriesDtos];
                }
            });
        });
    };
    BankingLotteryService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(lottery_1.Lottery.name)),
        __param(1, mongoose_1.InjectModel(banking_1.Banking.name)),
        __param(2, mongoose_1.InjectModel(consortium_1.Consortium.name))
    ], BankingLotteryService);
    return BankingLotteryService;
}());
exports.BankingLotteryService = BankingLotteryService;
