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
exports.BettingPanelService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var bet_1 = require("@database/datamodels/schemas/bet");
var bet_status_1 = require("@database/datamodels/enums/bet.status");
var banking_1 = require("@database/datamodels/schemas/banking");
var transaction_type_1 = require("@database/datamodels/enums/transaction.type");
var transaction_1 = require("@database/datamodels/schemas/transaction");
var transaction_objects_1 = require("@database/datamodels/enums/transaction.objects");
var const_app_1 = require("@utils/const.app");
var lottery_1 = require("@database/datamodels/schemas/lottery");
var playPool_1 = require("@database/datamodels/schemas/playPool");
var play_types_1 = require("@database/datamodels/enums/play.types");
var BettingPanelService = /** @class */ (function () {
    function BettingPanelService(transactionModel, lotteryModel, betModel, connection, bankingModel, playPoolModel, bankingLotteryService) {
        this.transactionModel = transactionModel;
        this.lotteryModel = lotteryModel;
        this.betModel = betModel;
        this.connection = connection;
        this.bankingModel = bankingModel;
        this.playPoolModel = playPoolModel;
        this.bankingLotteryService = bankingLotteryService;
        this.logger = new common_1.Logger(BettingPanelService_1.name);
    }
    BettingPanelService_1 = BettingPanelService;
    BettingPanelService.prototype.getAll = function (loggedUser) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var banking, betDtos, _b, _c, bet, _d, _e, e_1_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.bankingModel.findOne({ ownerUserId: loggedUser._id })];
                    case 1:
                        banking = _f.sent();
                        betDtos = [];
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 8, 9, 14]);
                        _b = __asyncValues(banking.bets);
                        _f.label = 3;
                    case 3: return [4 /*yield*/, _b.next()];
                    case 4:
                        if (!(_c = _f.sent(), !_c.done)) return [3 /*break*/, 7];
                        bet = _c.value;
                        _e = (_d = betDtos).push;
                        return [4 /*yield*/, this.mapToDto(bet)];
                    case 5:
                        _e.apply(_d, [_f.sent()]);
                        _f.label = 6;
                    case 6: return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_1_1 = _f.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _f.trys.push([9, , 12, 13]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _a.call(_b)];
                    case 10:
                        _f.sent();
                        _f.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/, betDtos.reverse()];
                }
            });
        });
    };
    BettingPanelService.prototype.getResumeSells = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var banking, now, bets;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.bankingModel.findOne({ ownerUserId: loggedUser._id })];
                    case 1:
                        banking = _b.sent();
                        now = new Date();
                        now.setHours(0, 0, 0, 0);
                        bets = banking.bets.filter(function (bet) {
                            var a = new Date(bet.date);
                            a.setHours(0, 0, 0, 0);
                            return now.getTime() === a.getTime();
                        });
                        _a = {};
                        return [4 /*yield*/, this.sumBets(bets, [bet_status_1.BetStatus.cancelled], PosibleSums.count)];
                    case 2:
                        _a.cancelled = _b.sent();
                        return [4 /*yield*/, this.sumBets(bets, [bet_status_1.BetStatus.expired], PosibleSums.count)];
                    case 3:
                        _a.expired = _b.sent();
                        return [4 /*yield*/, this.sumBets(bets, [bet_status_1.BetStatus.claimed], PosibleSums.count)];
                    case 4:
                        _a.claimed = _b.sent();
                        return [4 /*yield*/, this.sumBets(bets, [bet_status_1.BetStatus.pending], PosibleSums.count)];
                    case 5:
                        _a.pending = _b.sent();
                        return [4 /*yield*/, this.sumBets(bets, [bet_status_1.BetStatus.winner], PosibleSums.count)];
                    case 6:
                        _a.winner = _b.sent();
                        return [4 /*yield*/, this.sumBets(bets, [bet_status_1.BetStatus.loser], PosibleSums.count)];
                    case 7:
                        _a.loser = _b.sent(),
                            _a.total = bets.length;
                        return [4 /*yield*/, this.sumBets(bets, [bet_status_1.BetStatus.expired, bet_status_1.BetStatus.claimed, bet_status_1.BetStatus.pending, bet_status_1.BetStatus.winner, bet_status_1.BetStatus.loser], PosibleSums.amount)];
                    case 8:
                        _a.profits = _b.sent();
                        return [4 /*yield*/, this.sumBets(bets, [bet_status_1.BetStatus.claimed, bet_status_1.BetStatus.winner], PosibleSums.amountWin)];
                    case 9:
                        _a.prizes = _b.sent();
                        return [4 /*yield*/, this.sumBets(bets, [bet_status_1.BetStatus.pending], PosibleSums.amountWin)];
                    case 10:
                        _a.pendingPrizes = _b.sent();
                        return [4 /*yield*/, banking.calculateBalance()];
                    case 11: return [2 /*return*/, (_a.balance = _b.sent(),
                            _a)];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    BettingPanelService.prototype.getFiltered = function (q, value) {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function () {
            var bets, betsDto, bets_1, bets_1_1, bet, _b, _c, e_2_1;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.betModel.find((_d = {}, _d[q] = value, _d)).exec()];
                    case 1:
                        bets = _e.sent();
                        betsDto = [];
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 8, 9, 14]);
                        bets_1 = __asyncValues(bets);
                        _e.label = 3;
                    case 3: return [4 /*yield*/, bets_1.next()];
                    case 4:
                        if (!(bets_1_1 = _e.sent(), !bets_1_1.done)) return [3 /*break*/, 7];
                        bet = bets_1_1.value;
                        _c = (_b = betsDto).push;
                        return [4 /*yield*/, this.mapToDto(bet)];
                    case 5:
                        _c.apply(_b, [_e.sent()]);
                        _e.label = 6;
                    case 6: return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _e.trys.push([9, , 12, 13]);
                        if (!(bets_1_1 && !bets_1_1.done && (_a = bets_1["return"]))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _a.call(bets_1)];
                    case 10:
                        _e.sent();
                        _e.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/, betsDto];
                }
            });
        });
    };
    BettingPanelService.prototype.verifyLimit = function (req, loggedUser) {
        var e_3, _a;
        return __awaiter(this, void 0, void 0, function () {
            var lotteries, lottery, limit, sum, date, month, day, filterDateA, filterDateB, filter, playPools, playPools_1, playPools_1_1, play, e_3_1, finalLimit;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.bankingLotteryService.getAll(loggedUser)];
                    case 1:
                        lotteries = _b.sent();
                        lottery = lotteries.find(function (lottery) { return lottery._id.toString() === req.lotteryId; });
                        if (!lottery) {
                            return [2 /*return*/, null];
                        }
                        limit = lottery.bettingLimits.find(function (bettingLimit) { return bettingLimit.playType === req.playType && bettingLimit.status === true; });
                        if (!limit) {
                            return [2 /*return*/, null];
                        }
                        sum = 0;
                        date = new Date();
                        month = ("" + (date.getMonth() + 1)).padStart(2, '0');
                        day = ("" + date.getDate()).padStart(2, '0');
                        filterDateA = new Date(date.getFullYear() + "-" + month + "-" + day + "T00:00:00.000Z");
                        filterDateB = new Date(date.getFullYear() + "-" + month + "-" + day + "T23:59:59.000Z");
                        filter = [];
                        if (req.playType === play_types_1.PlayTypes.direct) {
                            filter = [{ 'playNumbers.first': req.playNumbers.first }];
                        }
                        if (req.playType === play_types_1.PlayTypes.pale) {
                            filter = [
                                {
                                    $or: [
                                        { 'playNumbers.first': req.playNumbers.first, 'playNumbers.second': req.playNumbers.second },
                                        { 'playNumbers.first': req.playNumbers.second, 'playNumbers.second': req.playNumbers.first },
                                    ]
                                },
                            ];
                        }
                        if (req.playType === play_types_1.PlayTypes.tripleta) {
                            filter = [
                                {
                                    $or: [
                                        {
                                            'playNumbers.first': req.playNumbers.first,
                                            'playNumbers.second': req.playNumbers.second,
                                            'playNumbers.third': req.playNumbers.third
                                        },
                                        {
                                            'playNumbers.first': req.playNumbers.third,
                                            'playNumbers.second': req.playNumbers.first,
                                            'playNumbers.third': req.playNumbers.second
                                        },
                                        {
                                            'playNumbers.first': req.playNumbers.second,
                                            'playNumbers.second': req.playNumbers.third,
                                            'playNumbers.third': req.playNumbers.first
                                        },
                                        {
                                            'playNumbers.first': req.playNumbers.first,
                                            'playNumbers.second': req.playNumbers.third,
                                            'playNumbers.third': req.playNumbers.second
                                        },
                                        {
                                            'playNumbers.first': req.playNumbers.second,
                                            'playNumbers.second': req.playNumbers.first,
                                            'playNumbers.third': req.playNumbers.third
                                        },
                                        {
                                            'playNumbers.first': req.playNumbers.third,
                                            'playNumbers.second': req.playNumbers.second,
                                            'playNumbers.third': req.playNumbers.first
                                        },
                                    ]
                                },
                            ];
                        }
                        return [4 /*yield*/, this.playPoolModel
                                .find()
                                .and([{ playType: req.playType }, { date: { $gte: filterDateA } }, { date: { $lte: filterDateB } }])
                                .and(filter)
                                .exec()];
                    case 2:
                        playPools = _b.sent();
                        playPools = playPools.filter(function (playPool) { return playPool.lotteryId.toString() === req.lotteryId; });
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 8, 9, 14]);
                        playPools_1 = __asyncValues(playPools);
                        _b.label = 4;
                    case 4: return [4 /*yield*/, playPools_1.next()];
                    case 5:
                        if (!(playPools_1_1 = _b.sent(), !playPools_1_1.done)) return [3 /*break*/, 7];
                        play = playPools_1_1.value;
                        sum += play.amount;
                        _b.label = 6;
                    case 6: return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_3_1 = _b.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _b.trys.push([9, , 12, 13]);
                        if (!(playPools_1_1 && !playPools_1_1.done && (_a = playPools_1["return"]))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _a.call(playPools_1)];
                    case 10:
                        _b.sent();
                        _b.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14:
                        finalLimit = limit.betAmount - sum;
                        if (finalLimit < 0) {
                            finalLimit = 0;
                        }
                        return [2 /*return*/, finalLimit];
                }
            });
        });
    };
    BettingPanelService.prototype.create = function (dto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var session, newObject, banking, plays_1, total_1, _a, _b, balance, transaction, error_1;
            var _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.connection.startSession()];
                    case 1:
                        session = _d.sent();
                        session.startTransaction();
                        newObject = null;
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 9, 11, 12]);
                        return [4 /*yield*/, this.bankingModel.findOne({ ownerUserId: loggedUser._id })];
                    case 3:
                        banking = _d.sent();
                        if (!banking.startOfOperation) {
                            //Inicio de operacion
                            banking.startOfOperation = new Date();
                        }
                        plays_1 = [];
                        total_1 = 0;
                        dto.plays.map(function (play) {
                            play.playNumbers.creationUserId = loggedUser._id;
                            play.playNumbers.modificationUserId = loggedUser._id;
                            play.creationUserId = loggedUser._id;
                            play.modificationUserId = loggedUser._id;
                            plays_1.push(play);
                            total_1 += play.amount;
                            var playPool = new _this.playPoolModel({
                                date: new Date(),
                                playNumbers: play.playNumbers,
                                playType: play.playType,
                                lotteryId: play.lotteryId,
                                amount: play.amount
                            });
                            playPool.save();
                        });
                        _b = (_a = this.betModel).bind;
                        _c = {
                            plays: plays_1,
                            date: new Date(),
                            creationUserId: loggedUser._id,
                            modificationUserId: loggedUser._id
                        };
                        return [4 /*yield*/, this.createSN()];
                    case 4:
                        newObject = new (_b.apply(_a, [void 0, (_c.sn = _d.sent(),
                                _c.betStatus = bet_status_1.BetStatus.pending,
                                _c)]))();
                        return [4 /*yield*/, banking.bets.push(newObject)];
                    case 5:
                        _d.sent();
                        return [4 /*yield*/, banking.calculateBalance()];
                    case 6:
                        balance = _d.sent();
                        transaction = new this.transactionModel({
                            type: transaction_type_1.TransactionType.credit,
                            originId: null,
                            originObject: transaction_objects_1.TransactionObjects.unknown,
                            destinationId: banking._id,
                            destinationObject: transaction_objects_1.TransactionObjects.banking,
                            amount: total_1,
                            description: 'A client payed for a bet',
                            creationUserId: loggedUser._id,
                            modificationUserId: loggedUser._id,
                            lastBalance: balance,
                            actualBalance: balance + total_1
                        });
                        banking.transactions.push(transaction);
                        return [4 /*yield*/, banking.save()];
                    case 7:
                        _d.sent();
                        return [4 /*yield*/, session.commitTransaction()];
                    case 8:
                        _d.sent();
                        return [3 /*break*/, 12];
                    case 9:
                        error_1 = _d.sent();
                        return [4 /*yield*/, session.abortTransaction()];
                    case 10:
                        _d.sent();
                        this.logger.error(error_1);
                        if (error_1.code === 11000) {
                            throw new common_1.ConflictException(const_app_1.ConstApp.USERNAME_EXISTS_ERROR);
                        }
                        else {
                            throw new common_1.InternalServerErrorException();
                        }
                        return [3 /*break*/, 12];
                    case 11:
                        session.endSession();
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, this.mapToDto(newObject)];
                }
            });
        });
    };
    BettingPanelService.prototype.cancelBet = function (dto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var session, betFounded, banking, bet, _a, total_2, balance, transaction, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.connection.startSession()];
                    case 1:
                        session = _b.sent();
                        session.startTransaction();
                        betFounded = null;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 9, 11, 12]);
                        return [4 /*yield*/, this.bankingModel.findOne({ ownerUserId: loggedUser._id })];
                    case 3:
                        banking = _b.sent();
                        bet = banking.bets.filter(function (bet) { return bet._id.toString() === dto._id.toString(); }).pop();
                        _a = bet.betStatus !== bet_status_1.BetStatus.pending;
                        if (_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.canCancelTicket(bet)];
                    case 4:
                        _a = !(_b.sent());
                        _b.label = 5;
                    case 5:
                        if (_a) {
                            throw new common_1.UnauthorizedException(const_app_1.ConstApp.CANNOT_CANCEL_TICKET);
                        }
                        total_2 = 0;
                        banking.bets.map(function (bet) {
                            if (bet._id.toString() === dto._id.toString()) {
                                bet.betStatus = bet_status_1.BetStatus.cancelled;
                                betFounded = bet;
                                bet.plays.map(function (play) {
                                    total_2 += play.amount;
                                });
                            }
                        });
                        return [4 /*yield*/, banking.calculateBalance()];
                    case 6:
                        balance = _b.sent();
                        transaction = new this.transactionModel({
                            type: transaction_type_1.TransactionType.debit,
                            originId: null,
                            originObject: transaction_objects_1.TransactionObjects.unknown,
                            destinationId: banking._id,
                            destinationObject: transaction_objects_1.TransactionObjects.banking,
                            amount: total_2 * -1,
                            description: 'A client cancelled a bet',
                            creationUserId: loggedUser._id,
                            modificationUserId: loggedUser._id,
                            lastBalance: balance,
                            actualBalance: balance + total_2 * -1
                        });
                        banking.transactions.push(transaction);
                        return [4 /*yield*/, banking.save()];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, session.commitTransaction()];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 9:
                        error_2 = _b.sent();
                        return [4 /*yield*/, session.abortTransaction()];
                    case 10:
                        _b.sent();
                        this.logger.error(error_2);
                        if (error_2.code === 11000) {
                            throw new common_1.ConflictException(const_app_1.ConstApp.USERNAME_EXISTS_ERROR);
                        }
                        else {
                            throw new common_1.InternalServerErrorException();
                        }
                        return [3 /*break*/, 12];
                    case 11:
                        session.endSession();
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, this.mapToDto(betFounded)];
                }
            });
        });
    };
    BettingPanelService.prototype.getClaimTicket = function (dto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var banking, bet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bankingModel.findOne({ ownerUserId: loggedUser._id })];
                    case 1:
                        banking = _a.sent();
                        bet = banking.bets.filter(function (bet) { return bet.sn.toString() === dto.sn.toString(); }).pop();
                        if (bet.betStatus !== bet_status_1.BetStatus.winner) {
                            throw new common_1.UnauthorizedException(const_app_1.ConstApp.CANNOT_CLAIM_TICKET);
                        }
                        return [2 /*return*/, this.mapToDto(bet)];
                }
            });
        });
    };
    BettingPanelService.prototype.claimTicket = function (dto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var session, betFounded, banking, bet, amountToPay_1, balance, transaction, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.startSession()];
                    case 1:
                        session = _a.sent();
                        session.startTransaction();
                        betFounded = null;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, 9, 10]);
                        return [4 /*yield*/, this.bankingModel.findOne({ ownerUserId: loggedUser._id })];
                    case 3:
                        banking = _a.sent();
                        bet = banking.bets.filter(function (bet) { return bet.sn.toString() === dto.sn.toString(); }).pop();
                        if (bet.betStatus !== bet_status_1.BetStatus.winner) {
                            throw new common_1.UnauthorizedException(const_app_1.ConstApp.CANNOT_CLAIM_TICKET);
                        }
                        amountToPay_1 = 0;
                        banking.bets.map(function (bet) {
                            if (bet.sn === dto.sn) {
                                bet.betStatus = bet_status_1.BetStatus.claimed;
                                bet.claimDate = new Date();
                                betFounded = bet;
                                amountToPay_1 += bet.amountWin;
                            }
                        });
                        return [4 /*yield*/, banking.calculateBalance()];
                    case 4:
                        balance = _a.sent();
                        transaction = new this.transactionModel({
                            type: transaction_type_1.TransactionType.debit,
                            originId: null,
                            originObject: transaction_objects_1.TransactionObjects.unknown,
                            destinationId: banking._id,
                            destinationObject: transaction_objects_1.TransactionObjects.banking,
                            amount: amountToPay_1 * -1,
                            description: 'A client claimed a bet',
                            creationUserId: loggedUser._id,
                            modificationUserId: loggedUser._id,
                            lastBalance: balance,
                            actualBalance: balance + amountToPay_1 * -1
                        });
                        banking.transactions.push(transaction);
                        return [4 /*yield*/, banking.save()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, session.commitTransaction()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 7:
                        error_3 = _a.sent();
                        return [4 /*yield*/, session.abortTransaction()];
                    case 8:
                        _a.sent();
                        this.logger.error(error_3);
                        if (error_3.code === 11000) {
                            throw new common_1.ConflictException(const_app_1.ConstApp.CANNOT_CLAIM_TICKET);
                        }
                        else {
                            throw new common_1.InternalServerErrorException();
                        }
                        return [3 /*break*/, 10];
                    case 9:
                        session.endSession();
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, this.mapToDto(betFounded)];
                }
            });
        });
    };
    BettingPanelService.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.mapToDto;
                        return [4 /*yield*/, this.betModel.findById(id).exec()];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    BettingPanelService.prototype.mapToDto = function (bet) {
        var e_4, _a;
        return __awaiter(this, void 0, void 0, function () {
            var _id, plays, date, betStatus, amountWin, claimDate, sn, playDtos, plays_2, plays_2_1, play, lotteryName, e_4_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _id = bet._id, plays = bet.plays, date = bet.date, betStatus = bet.betStatus, amountWin = bet.amountWin, claimDate = bet.claimDate;
                        sn = bet.sn;
                        return [4 /*yield*/, this.canSeeSn(bet)];
                    case 1:
                        if (!(_b.sent())) {
                            sn = null;
                        }
                        playDtos = [];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 8, 9, 14]);
                        plays_2 = __asyncValues(plays);
                        _b.label = 3;
                    case 3: return [4 /*yield*/, plays_2.next()];
                    case 4:
                        if (!(plays_2_1 = _b.sent(), !plays_2_1.done)) return [3 /*break*/, 7];
                        play = plays_2_1.value;
                        return [4 /*yield*/, this.lotteryModel.findOne({ _id: play.lotteryId })];
                    case 5:
                        lotteryName = (_b.sent()).name;
                        playDtos.push({
                            amount: play.amount,
                            lotteryId: play.lotteryId,
                            playNumbers: play.playNumbers,
                            playType: play.playType,
                            lotteryName: lotteryName
                        });
                        _b.label = 6;
                    case 6: return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_4_1 = _b.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _b.trys.push([9, , 12, 13]);
                        if (!(plays_2_1 && !plays_2_1.done && (_a = plays_2["return"]))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _a.call(plays_2)];
                    case 10:
                        _b.sent();
                        _b.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/, {
                            _id: _id,
                            plays: playDtos,
                            date: date,
                            sn: sn,
                            betStatus: betStatus,
                            amountWin: amountWin,
                            claimDate: claimDate
                        }];
                }
            });
        });
    };
    BettingPanelService.prototype.canCancelTicket = function (bet) {
        return __awaiter(this, void 0, void 0, function () {
            var diffMs, diffMins;
            return __generator(this, function (_a) {
                diffMs = new Date(bet.date) - new Date();
                diffMins = diffMs / 60000;
                return [2 /*return*/, diffMins > -5];
            });
        });
    };
    BettingPanelService.prototype.canSeeSn = function (bet) {
        return __awaiter(this, void 0, void 0, function () {
            var diffMs, diffMins;
            return __generator(this, function (_a) {
                diffMs = new Date(bet.date) - new Date();
                diffMins = diffMs / 60000;
                return [2 /*return*/, diffMins > -10];
            });
        });
    };
    BettingPanelService.prototype.createSN = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Date().getTime().toString() + parseInt(String(Math.random() * (999 - 100) + 100), 0).toString()];
            });
        });
    };
    BettingPanelService.prototype.sumBets = function (bets, betStatus, key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (key) {
                    case PosibleSums.amount:
                        return [2 /*return*/, bets.reduce(function (acc, bet) {
                                return (acc +
                                    (betStatus.includes(bet.betStatus)
                                        ? bet.plays.reduce(function (acc, play) {
                                            return acc + (play.amount ? play.amount : 0);
                                        }, 0)
                                        : 0));
                            }, 0)];
                    case PosibleSums.amountWin:
                        return [2 /*return*/, bets.reduce(function (acc, bet) {
                                return acc + (betStatus.includes(bet.betStatus) ? (bet.amountWin ? bet.amountWin : 0) : 0);
                            }, 0)];
                    case PosibleSums.count:
                        return [2 /*return*/, bets.filter(function (bet) { return betStatus.includes(bet.betStatus); }).length];
                }
                return [2 /*return*/, 0];
            });
        });
    };
    var BettingPanelService_1;
    BettingPanelService = BettingPanelService_1 = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(transaction_1.Transaction.name)),
        __param(1, mongoose_1.InjectModel(lottery_1.Lottery.name)),
        __param(2, mongoose_1.InjectModel(bet_1.Bet.name)),
        __param(3, mongoose_1.InjectConnection(const_app_1.ConstApp.BANKING)),
        __param(4, mongoose_1.InjectModel(banking_1.Banking.name)),
        __param(5, mongoose_1.InjectModel(playPool_1.PlayPool.name))
    ], BettingPanelService);
    return BettingPanelService;
}());
exports.BettingPanelService = BettingPanelService;
var PosibleSums;
(function (PosibleSums) {
    PosibleSums[PosibleSums["amount"] = 0] = "amount";
    PosibleSums[PosibleSums["amountWin"] = 1] = "amountWin";
    PosibleSums[PosibleSums["count"] = 2] = "count";
})(PosibleSums || (PosibleSums = {}));
