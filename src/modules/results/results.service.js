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
exports.ResultsService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var result_1 = require("@database/datamodels/schemas/result");
var draw_1 = require("@database/datamodels/schemas/draw");
var lottery_1 = require("@database/datamodels/schemas/lottery");
var consortium_1 = require("@database/datamodels/schemas/consortium");
var banking_1 = require("@database/datamodels/schemas/banking");
var dominican_lottery_prizes_1 = require("@database/datamodels/enums/dominican.lottery.prizes");
var bet_status_1 = require("@database/datamodels/enums/bet.status");
var play_types_1 = require("@database/datamodels/enums/play.types");
var ResultsService = /** @class */ (function () {
    function ResultsService(lotteryModel, resultModel, drawModel, bankingModel, consortiumModel) {
        this.lotteryModel = lotteryModel;
        this.resultModel = resultModel;
        this.drawModel = drawModel;
        this.bankingModel = bankingModel;
        this.consortiumModel = consortiumModel;
    }
    ResultsService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.lotteryModel.aggregate([
                        { $match: {} },
                        { $unwind: '$results' },
                        {
                            $project: {
                                _id: '$results._id',
                                date: '$results.date',
                                createdAt: '$results.createdAt',
                                draw: '$results.draw',
                                lotteryId: '$_id',
                                lotteryName: '$name'
                            }
                        },
                        { $sort: { date: -1 } },
                    ])];
            });
        });
    };
    ResultsService.prototype.create = function (dto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var lottery, date, month, day, filterDateA, filterDateB, lotteryPlayTime, checkDate, now, results, draw, result, bankings, _i, bankings_1, banking, consortium, config, bets, _a, bets_1, bet, amount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.lotteryModel.findById(dto.lotteryId).exec()];
                    case 1:
                        lottery = _b.sent();
                        if (!lottery) {
                            throw new common_1.BadRequestException();
                        }
                        date = new Date(dto.date);
                        month = ("" + (date.getMonth() + 1)).padStart(2, '0');
                        day = ("" + date.getDate()).padStart(2, '0');
                        filterDateA = new Date(date.getFullYear() + "-" + month + "-" + day + "T00:00:00.000Z");
                        filterDateB = new Date(date.getFullYear() + "-" + month + "-" + day + "T23:59:59.000Z");
                        lotteryPlayTime = lottery.playTime.split(':');
                        checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(lotteryPlayTime[0]), parseInt(lotteryPlayTime[1]), 0);
                        now = new Date();
                        if (now < checkDate) {
                            //You cant add the results if the lottery has not been played yet
                            throw new common_1.BadRequestException();
                        }
                        return [4 /*yield*/, this.lotteryModel.aggregate([
                                { $match: { 'results.date': { $gte: filterDateA, $lt: filterDateB } } },
                                { $unwind: '$results' },
                                {
                                    $project: {
                                        _id: '$results._id',
                                        lotteryId: '$_id'
                                    }
                                },
                            ])];
                    case 2:
                        results = _b.sent();
                        results = results.filter(function (result) { return result.lotteryId.toString() === dto.lotteryId; });
                        if (results && results.length > 0) {
                            throw new common_1.BadRequestException();
                        }
                        draw = new this.drawModel({
                            first: dto.first,
                            second: dto.second,
                            third: dto.third,
                            creationUserId: loggedUser.id,
                            modificationUserId: loggedUser.id
                        });
                        result = new this.resultModel({
                            date: filterDateA,
                            createdAt: new Date(),
                            draw: draw,
                            creationUserId: loggedUser.id,
                            modificationUserId: loggedUser.id
                        });
                        if (filterDateA.getDate() == now.getDate() &&
                            filterDateA.getMonth() == now.getMonth() &&
                            filterDateA.getFullYear() == now.getFullYear()) {
                            lottery.lastDraw = draw;
                        }
                        lottery.results.push(result);
                        return [4 /*yield*/, lottery.save()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.bankingModel.find().exec()];
                    case 4:
                        bankings = _b.sent();
                        _i = 0, bankings_1 = bankings;
                        _b.label = 5;
                    case 5:
                        if (!(_i < bankings_1.length)) return [3 /*break*/, 13];
                        banking = bankings_1[_i];
                        return [4 /*yield*/, this.consortiumModel.findById(banking.consortiumId).exec()];
                    case 6:
                        consortium = _b.sent();
                        config = consortium.consortiumLotteries.find(function (consortiumLottery) { return consortiumLottery.lotteryId.toString() === lottery._id.toString(); });
                        if (!config) {
                            // El consorcio no configuro esta loteria para esta banca
                            return [3 /*break*/, 12];
                        }
                        bets = banking.bets.filter(function (bet) {
                            var month = ("" + (bet.date.getMonth() + 1)).padStart(2, '0');
                            var day = ("" + bet.date.getDate()).padStart(2, '0');
                            var dateParsed = new Date(bet.date.getFullYear() + "-" + month + "-" + day + "T05:00:00.000Z");
                            if (filterDateA <= dateParsed &&
                                filterDateB >= dateParsed &&
                                ![bet_status_1.BetStatus.claimed, bet_status_1.BetStatus.cancelled].includes(bet.betStatus)) {
                                return true;
                            }
                            return false;
                        });
                        _a = 0, bets_1 = bets;
                        _b.label = 7;
                    case 7:
                        if (!(_a < bets_1.length)) return [3 /*break*/, 10];
                        bet = bets_1[_a];
                        return [4 /*yield*/, this.calculateWinPlays(bet, draw, lottery, config)];
                    case 8:
                        amount = _b.sent();
                        if (amount !== null) {
                            if (!bet.amountWin) {
                                bet.amountWin = 0;
                            }
                            bet.amountWin += amount;
                            if (amount > 0) {
                                // No se hace el chekeo de pending pq si gano una vez es ganador
                                bet.betStatus = bet_status_1.BetStatus.winner;
                            }
                            else {
                                // Si estaba en winner no se pasa a loser pq quiere decir
                                // que gano en una loteria anterior
                                if (bet.betStatus === bet_status_1.BetStatus.pending) {
                                    bet.betStatus = bet_status_1.BetStatus.loser;
                                }
                            }
                        }
                        _b.label = 9;
                    case 9:
                        _a++;
                        return [3 /*break*/, 7];
                    case 10: return [4 /*yield*/, banking.save()];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12:
                        _i++;
                        return [3 /*break*/, 5];
                    case 13: return [2 /*return*/, result];
                }
            });
        });
    };
    ResultsService.prototype.calculateWinPlays = function (bet, draw, lottery, config) {
        return __awaiter(this, void 0, void 0, function () {
            var c, _loop_1, this_1, _i, _a, play;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _loop_1 = function (play) {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, aux, aux2_1, matches, _o, _p, _q, _r;
                            return __generator(this, function (_s) {
                                switch (_s.label) {
                                    case 0:
                                        if (!(play.lotteryId.toString() === lottery._id.toString())) return [3 /*break*/, 20];
                                        if (!c) {
                                            c = 0;
                                        }
                                        _a = play.playType;
                                        switch (_a) {
                                            case play_types_1.PlayTypes.direct: return [3 /*break*/, 1];
                                            case play_types_1.PlayTypes.pale: return [3 /*break*/, 9];
                                            case play_types_1.PlayTypes.tripleta: return [3 /*break*/, 14];
                                            case play_types_1.PlayTypes.superPale: return [3 /*break*/, 19];
                                        }
                                        return [3 /*break*/, 20];
                                    case 1:
                                        _b = play.playNumbers.first;
                                        switch (_b) {
                                            case draw.first: return [3 /*break*/, 2];
                                            case draw.second: return [3 /*break*/, 4];
                                            case draw.third: return [3 /*break*/, 6];
                                        }
                                        return [3 /*break*/, 8];
                                    case 2:
                                        _c = c;
                                        _d = play.amount;
                                        return [4 /*yield*/, this_1.getPrizeLimit(config, dominican_lottery_prizes_1.DominicanLotteryPrizes.first)];
                                    case 3:
                                        c = _c + _d * (_s.sent());
                                        return [3 /*break*/, 8];
                                    case 4:
                                        _e = c;
                                        _f = play.amount;
                                        return [4 /*yield*/, this_1.getPrizeLimit(config, dominican_lottery_prizes_1.DominicanLotteryPrizes.second)];
                                    case 5:
                                        c = _e + _f * (_s.sent());
                                        return [3 /*break*/, 8];
                                    case 6:
                                        _g = c;
                                        _h = play.amount;
                                        return [4 /*yield*/, this_1.getPrizeLimit(config, dominican_lottery_prizes_1.DominicanLotteryPrizes.third)];
                                    case 7:
                                        c = _g + _h * (_s.sent());
                                        return [3 /*break*/, 8];
                                    case 8: return [3 /*break*/, 20];
                                    case 9:
                                        if (!((play.playNumbers.first === draw.first && play.playNumbers.second === draw.second) ||
                                            (play.playNumbers.first === draw.first && play.playNumbers.second === draw.third))) return [3 /*break*/, 11];
                                        // 1ra 2da o 1ra 3ra
                                        _j = c;
                                        _k = play.amount;
                                        return [4 /*yield*/, this_1.getPrizeLimit(config, dominican_lottery_prizes_1.DominicanLotteryPrizes.pale)];
                                    case 10:
                                        // 1ra 2da o 1ra 3ra
                                        c = _j + _k * (_s.sent());
                                        return [3 /*break*/, 13];
                                    case 11:
                                        if (!(play.playNumbers.first === draw.second && play.playNumbers.second === draw.third)) return [3 /*break*/, 13];
                                        // Pale 2-3
                                        _l = c;
                                        _m = play.amount;
                                        return [4 /*yield*/, this_1.getPrizeLimit(config, dominican_lottery_prizes_1.DominicanLotteryPrizes.paleTwoThree)];
                                    case 12:
                                        // Pale 2-3
                                        c = _l + _m * (_s.sent());
                                        _s.label = 13;
                                    case 13: return [3 /*break*/, 20];
                                    case 14:
                                        aux = [draw.first, draw.second, draw.third];
                                        aux2_1 = [play.playNumbers.first, play.playNumbers.second, play.playNumbers.third];
                                        matches = aux.filter(function (x) { return aux2_1.includes(x); }).length;
                                        if (!(matches === 3)) return [3 /*break*/, 16];
                                        // Tripleta
                                        _o = c;
                                        _p = play.amount;
                                        return [4 /*yield*/, this_1.getPrizeLimit(config, dominican_lottery_prizes_1.DominicanLotteryPrizes.triplet)];
                                    case 15:
                                        // Tripleta
                                        c = _o + _p * (_s.sent());
                                        return [3 /*break*/, 18];
                                    case 16:
                                        if (!(matches === 2)) return [3 /*break*/, 18];
                                        _q = c;
                                        _r = play.amount;
                                        return [4 /*yield*/, this_1.getPrizeLimit(config, dominican_lottery_prizes_1.DominicanLotteryPrizes.twoNumbers)];
                                    case 17:
                                        c = _q + _r * (_s.sent());
                                        _s.label = 18;
                                    case 18: return [3 /*break*/, 20];
                                    case 19: 
                                    //TODO
                                    return [3 /*break*/, 20];
                                    case 20: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = bet.plays;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        play = _a[_i];
                        return [5 /*yield**/, _loop_1(play)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, c];
                }
            });
        });
    };
    ResultsService.prototype.getPrizeLimit = function (config, type) {
        return __awaiter(this, void 0, void 0, function () {
            var limit;
            return __generator(this, function (_a) {
                limit = config.prizeLimits.find(function (value) { return value.playType === type; });
                if (!limit) {
                    return [2 /*return*/, 0];
                }
                if (limit.status === false) {
                    return [2 /*return*/, 0];
                }
                return [2 /*return*/, limit.paymentAmount];
            });
        });
    };
    ResultsService.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resultModel.findById(id).exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ResultsService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(lottery_1.Lottery.name)),
        __param(1, mongoose_1.InjectModel(result_1.Result.name)),
        __param(2, mongoose_1.InjectModel(draw_1.Draw.name)),
        __param(3, mongoose_1.InjectModel(banking_1.Banking.name)),
        __param(4, mongoose_1.InjectModel(consortium_1.Consortium.name))
    ], ResultsService);
    return ResultsService;
}());
exports.ResultsService = ResultsService;
