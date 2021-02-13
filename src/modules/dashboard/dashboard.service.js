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
exports.DashboardService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var dashboard_dto_1 = require("@dashboard/dtos/dashboard.dto");
var dashboard_node_dto_1 = require("@dashboard/dtos/dashboard.node.dto");
var dashboard_link_dto_1 = require("@dashboard/dtos/dashboard.link.dto");
var dashboard_cluster_dto_1 = require("@dashboard/dtos/dashboard.cluster.dto");
var consortium_1 = require("@database/datamodels/schemas/consortium");
var banking_1 = require("@database/datamodels/schemas/banking");
var role_1 = require("@database/datamodels/enums/role");
var bet_status_1 = require("@database/datamodels/enums/bet.status");
var const_app_1 = require("@utils/const.app");
var web_user_1 = require("@database/datamodels/schemas/web.user");
var DashboardService = /** @class */ (function () {
    function DashboardService(consortiumModel, bankingModel, webUserModel) {
        this.consortiumModel = consortiumModel;
        this.bankingModel = bankingModel;
        this.webUserModel = webUserModel;
    }
    DashboardService.prototype.getDashboardDiagram = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, consortiumIds, bankingIds, consortiums, bankings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = new dashboard_dto_1.DashboardDiagramDto();
                        consortiumIds = [];
                        bankingIds = [];
                        return [4 /*yield*/, this.consortiumModel.find().exec()];
                    case 1:
                        consortiums = _a.sent();
                        return [4 /*yield*/, this.bankingModel.find().exec()];
                    case 2:
                        bankings = _a.sent();
                        consortiums.forEach(function (consortium, index) {
                            res.nodes.push(new dashboard_node_dto_1.DashboardDiagramNodeDto(consortium._id.toString(), consortium.name));
                            consortiumIds.push(consortium._id.toString());
                            bankings.forEach(function (banking, index2) {
                                if (banking.consortiumId.toString() === consortium._id.toString()) {
                                    bankingIds.push(banking._id.toString());
                                    res.nodes.push(new dashboard_node_dto_1.DashboardDiagramNodeDto(banking._id.toString(), banking.name));
                                    res.links.push(new dashboard_link_dto_1.DashboardDiagramLinkDto('link' + (index + 1).toString() + (index2 + 1).toString(), consortium._id.toString(), banking._id.toString()));
                                }
                            });
                        });
                        if (consortiumIds.length > 0) {
                            res.clusters.push(new dashboard_cluster_dto_1.DashboardDiagramClusterDto('cluster0', 'Consorcios', consortiumIds));
                        }
                        if (bankingIds.length > 0) {
                            res.clusters.push(new dashboard_cluster_dto_1.DashboardDiagramClusterDto('cluster1', 'Bancas', bankingIds));
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    DashboardService.prototype.getConsortiumsStatistics = function () {
        var e_1, _a, e_2, _b;
        return __awaiter(this, void 0, void 0, function () {
            var consortiumsDto, consortiums, consortiums_1, consortiums_1_1, consortium, cancelled, expired, claimed, pending_1, winner, loser, total, profits, prizes, pendingPrizes, balance, bankings, bankings_1, bankings_1_1, banking, _c, _d, _e, _f, _g, _h, _j, _k, _l, e_2_1, e_1_1;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        consortiumsDto = [];
                        return [4 /*yield*/, this.consortiumModel.find().exec()];
                    case 1:
                        consortiums = _m.sent();
                        _m.label = 2;
                    case 2:
                        _m.trys.push([2, 30, 31, 36]);
                        consortiums_1 = __asyncValues(consortiums);
                        _m.label = 3;
                    case 3: return [4 /*yield*/, consortiums_1.next()];
                    case 4:
                        if (!(consortiums_1_1 = _m.sent(), !consortiums_1_1.done)) return [3 /*break*/, 29];
                        consortium = consortiums_1_1.value;
                        cancelled = 0;
                        expired = 0;
                        claimed = 0;
                        pending_1 = 0;
                        winner = 0;
                        loser = 0;
                        total = 0;
                        profits = 0;
                        prizes = 0;
                        pendingPrizes = 0;
                        return [4 /*yield*/, consortium.calculateBalance()];
                    case 5:
                        balance = _m.sent();
                        return [4 /*yield*/, this.bankingModel.find({ consortiumId: consortium._id }).exec()];
                    case 6:
                        bankings = _m.sent();
                        if (!bankings)
                            throw new common_1.BadRequestException(const_app_1.ConstApp.ESTABLISHMENT_NOT_FOUND);
                        _m.label = 7;
                    case 7:
                        _m.trys.push([7, 21, 22, 27]);
                        bankings_1 = (e_2 = void 0, __asyncValues(bankings));
                        _m.label = 8;
                    case 8: return [4 /*yield*/, bankings_1.next()];
                    case 9:
                        if (!(bankings_1_1 = _m.sent(), !bankings_1_1.done)) return [3 /*break*/, 20];
                        banking = bankings_1_1.value;
                        _c = cancelled;
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.cancelled], PosibleSums.count)];
                    case 10:
                        cancelled = _c + _m.sent();
                        _d = expired;
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.expired], PosibleSums.count)];
                    case 11:
                        expired = _d + _m.sent();
                        _e = claimed;
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.claimed], PosibleSums.count)];
                    case 12:
                        claimed = _e + _m.sent();
                        _f = pending_1;
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.pending], PosibleSums.count)];
                    case 13:
                        pending_1 = _f + _m.sent();
                        _g = winner;
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.winner], PosibleSums.count)];
                    case 14:
                        winner = _g + _m.sent();
                        _h = loser;
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.loser], PosibleSums.count)];
                    case 15:
                        loser = _h + _m.sent();
                        total += banking.bets.length;
                        _j = profits;
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.expired, bet_status_1.BetStatus.claimed, bet_status_1.BetStatus.pending, bet_status_1.BetStatus.winner, bet_status_1.BetStatus.loser], PosibleSums.amount)];
                    case 16:
                        profits = _j + _m.sent();
                        _k = prizes;
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.claimed, bet_status_1.BetStatus.winner], PosibleSums.amountWin)];
                    case 17:
                        prizes = _k + _m.sent();
                        _l = pendingPrizes;
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.pending], PosibleSums.amountWin)];
                    case 18:
                        pendingPrizes = _l + _m.sent();
                        _m.label = 19;
                    case 19: return [3 /*break*/, 8];
                    case 20: return [3 /*break*/, 27];
                    case 21:
                        e_2_1 = _m.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 27];
                    case 22:
                        _m.trys.push([22, , 25, 26]);
                        if (!(bankings_1_1 && !bankings_1_1.done && (_b = bankings_1["return"]))) return [3 /*break*/, 24];
                        return [4 /*yield*/, _b.call(bankings_1)];
                    case 23:
                        _m.sent();
                        _m.label = 24;
                    case 24: return [3 /*break*/, 26];
                    case 25:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 26: return [7 /*endfinally*/];
                    case 27:
                        consortiumsDto.push({
                            _id: consortium._id,
                            name: consortium.name,
                            cancelled: cancelled,
                            expired: expired,
                            claimed: claimed,
                            pending: pending_1,
                            winner: winner,
                            loser: loser,
                            total: total,
                            profits: profits,
                            prizes: prizes,
                            pendingPrizes: pendingPrizes,
                            balance: balance
                        });
                        _m.label = 28;
                    case 28: return [3 /*break*/, 3];
                    case 29: return [3 /*break*/, 36];
                    case 30:
                        e_1_1 = _m.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 36];
                    case 31:
                        _m.trys.push([31, , 34, 35]);
                        if (!(consortiums_1_1 && !consortiums_1_1.done && (_a = consortiums_1["return"]))) return [3 /*break*/, 33];
                        return [4 /*yield*/, _a.call(consortiums_1)];
                    case 32:
                        _m.sent();
                        _m.label = 33;
                    case 33: return [3 /*break*/, 35];
                    case 34:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 35: return [7 /*endfinally*/];
                    case 36: return [2 /*return*/, consortiumsDto];
                }
            });
        });
    };
    DashboardService.prototype.getAdminWidgetsStatistics = function () {
        var e_3, _a, e_4, _b;
        return __awaiter(this, void 0, void 0, function () {
            var consortiums, balance, prizes, profits, ticketsSold, consortiums_2, consortiums_2_1, consortium, bankings, bankings_2, bankings_2_1, banking, _c, _d, _e, e_4_1, e_3_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.consortiumModel.find().exec()];
                    case 1:
                        consortiums = _f.sent();
                        balance = 0;
                        prizes = 0;
                        profits = 0;
                        ticketsSold = 0;
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 22, 23, 28]);
                        consortiums_2 = __asyncValues(consortiums);
                        _f.label = 3;
                    case 3: return [4 /*yield*/, consortiums_2.next()];
                    case 4:
                        if (!(consortiums_2_1 = _f.sent(), !consortiums_2_1.done)) return [3 /*break*/, 21];
                        consortium = consortiums_2_1.value;
                        return [4 /*yield*/, this.bankingModel.find({ consortiumId: consortium._id }).exec()];
                    case 5:
                        bankings = _f.sent();
                        _f.label = 6;
                    case 6:
                        _f.trys.push([6, 14, 15, 20]);
                        bankings_2 = (e_4 = void 0, __asyncValues(bankings));
                        _f.label = 7;
                    case 7: return [4 /*yield*/, bankings_2.next()];
                    case 8:
                        if (!(bankings_2_1 = _f.sent(), !bankings_2_1.done)) return [3 /*break*/, 13];
                        banking = bankings_2_1.value;
                        _c = prizes;
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.claimed, bet_status_1.BetStatus.winner], PosibleSums.amountWin)];
                    case 9:
                        prizes = _c + _f.sent();
                        _d = profits;
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.expired, bet_status_1.BetStatus.claimed, bet_status_1.BetStatus.pending, bet_status_1.BetStatus.winner, bet_status_1.BetStatus.loser], PosibleSums.amount)];
                    case 10:
                        profits = _d + _f.sent();
                        _e = ticketsSold;
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.expired, bet_status_1.BetStatus.claimed, bet_status_1.BetStatus.pending, bet_status_1.BetStatus.winner, bet_status_1.BetStatus.loser], PosibleSums.count)];
                    case 11:
                        ticketsSold = _e + _f.sent();
                        _f.label = 12;
                    case 12: return [3 /*break*/, 7];
                    case 13: return [3 /*break*/, 20];
                    case 14:
                        e_4_1 = _f.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 20];
                    case 15:
                        _f.trys.push([15, , 18, 19]);
                        if (!(bankings_2_1 && !bankings_2_1.done && (_b = bankings_2["return"]))) return [3 /*break*/, 17];
                        return [4 /*yield*/, _b.call(bankings_2)];
                    case 16:
                        _f.sent();
                        _f.label = 17;
                    case 17: return [3 /*break*/, 19];
                    case 18:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 19: return [7 /*endfinally*/];
                    case 20: return [3 /*break*/, 3];
                    case 21: return [3 /*break*/, 28];
                    case 22:
                        e_3_1 = _f.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 28];
                    case 23:
                        _f.trys.push([23, , 26, 27]);
                        if (!(consortiums_2_1 && !consortiums_2_1.done && (_a = consortiums_2["return"]))) return [3 /*break*/, 25];
                        return [4 /*yield*/, _a.call(consortiums_2)];
                    case 24:
                        _f.sent();
                        _f.label = 25;
                    case 25: return [3 /*break*/, 27];
                    case 26:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 27: return [7 /*endfinally*/];
                    case 28: return [2 /*return*/, {
                            balance: balance,
                            prizes: prizes,
                            profits: profits,
                            ticketsSold: ticketsSold
                        }];
                }
            });
        });
    };
    DashboardService.prototype.getConsortiumWidgetsStatistics = function (loggedUser) {
        var e_5, _a;
        return __awaiter(this, void 0, void 0, function () {
            var consortiums, consortium, bankings, balance, prizes, profits, ticketsSold, bankings_3, bankings_3_1, banking, _b, _c, _d, e_5_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.consortiumModel.find({ ownerUserId: loggedUser._id }).exec()];
                    case 1:
                        consortiums = _e.sent();
                        if (consortiums.length === 0) {
                            throw new common_1.BadRequestException();
                        }
                        consortium = consortiums.pop();
                        return [4 /*yield*/, this.bankingModel.find({ consortiumId: consortium._id }).exec()];
                    case 2:
                        bankings = _e.sent();
                        return [4 /*yield*/, consortium.calculateBalance()];
                    case 3:
                        balance = _e.sent();
                        prizes = 0;
                        profits = 0;
                        ticketsSold = 0;
                        _e.label = 4;
                    case 4:
                        _e.trys.push([4, 12, 13, 18]);
                        bankings_3 = __asyncValues(bankings);
                        _e.label = 5;
                    case 5: return [4 /*yield*/, bankings_3.next()];
                    case 6:
                        if (!(bankings_3_1 = _e.sent(), !bankings_3_1.done)) return [3 /*break*/, 11];
                        banking = bankings_3_1.value;
                        _b = prizes;
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.claimed, bet_status_1.BetStatus.winner], PosibleSums.amountWin)];
                    case 7:
                        prizes = _b + _e.sent();
                        _c = profits;
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.expired, bet_status_1.BetStatus.claimed, bet_status_1.BetStatus.pending, bet_status_1.BetStatus.winner, bet_status_1.BetStatus.loser], PosibleSums.amount)];
                    case 8:
                        profits = _c + _e.sent();
                        _d = ticketsSold;
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.expired, bet_status_1.BetStatus.claimed, bet_status_1.BetStatus.pending, bet_status_1.BetStatus.winner, bet_status_1.BetStatus.loser], PosibleSums.count)];
                    case 9:
                        ticketsSold = _d + _e.sent();
                        _e.label = 10;
                    case 10: return [3 /*break*/, 5];
                    case 11: return [3 /*break*/, 18];
                    case 12:
                        e_5_1 = _e.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 18];
                    case 13:
                        _e.trys.push([13, , 16, 17]);
                        if (!(bankings_3_1 && !bankings_3_1.done && (_a = bankings_3["return"]))) return [3 /*break*/, 15];
                        return [4 /*yield*/, _a.call(bankings_3)];
                    case 14:
                        _e.sent();
                        _e.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        if (e_5) throw e_5.error;
                        return [7 /*endfinally*/];
                    case 17: return [7 /*endfinally*/];
                    case 18: return [2 /*return*/, {
                            balance: balance,
                            prizes: prizes,
                            profits: profits,
                            ticketsSold: ticketsSold
                        }];
                }
            });
        });
    };
    DashboardService.prototype.getBankingWidgetsStatistics = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var bankings, banking;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.bankingModel.find({ ownerUserId: loggedUser._id }).exec()];
                    case 1:
                        bankings = _b.sent();
                        if (bankings.length === 0) {
                            throw new common_1.BadRequestException();
                        }
                        banking = bankings.pop();
                        _a = {};
                        return [4 /*yield*/, banking.calculateBalance()];
                    case 2:
                        _a.balance = _b.sent();
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.claimed, bet_status_1.BetStatus.winner], PosibleSums.amountWin)];
                    case 3:
                        _a.prizes = _b.sent();
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.expired, bet_status_1.BetStatus.claimed, bet_status_1.BetStatus.pending, bet_status_1.BetStatus.winner, bet_status_1.BetStatus.loser], PosibleSums.amount)];
                    case 4:
                        _a.profits = _b.sent();
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.expired, bet_status_1.BetStatus.claimed, bet_status_1.BetStatus.pending, bet_status_1.BetStatus.winner, bet_status_1.BetStatus.loser], PosibleSums.count)];
                    case 5: return [2 /*return*/, (_a.ticketsSold = _b.sent(),
                            _a)];
                }
            });
        });
    };
    DashboardService.prototype.getWebUserWidgetsStatistics = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var webUser;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.webUserModel.findOne({ ownerUserId: loggedUser._id }).exec()];
                    case 1:
                        webUser = _b.sent();
                        if (!webUser) {
                            throw new common_1.BadRequestException();
                        }
                        _a = {
                            prizes: 0,
                            profits: 0,
                            ticketsSold: 0
                        };
                        return [4 /*yield*/, webUser.calculateBalance()];
                    case 2: return [2 /*return*/, (_a.balance = _b.sent(),
                            _a)];
                }
            });
        });
    };
    DashboardService.prototype.getBankingPlayedNumbersStatistics = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var bankings, banking, numbers, now, aux, bets, i, key, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bankingModel.find({ ownerUserId: loggedUser._id }).exec()];
                    case 1:
                        bankings = _a.sent();
                        if (bankings.length === 0) {
                            throw new common_1.BadRequestException(const_app_1.ConstApp.ESTABLISHMENT_NOT_FOUND);
                        }
                        banking = bankings.pop();
                        numbers = [];
                        now = new Date();
                        aux = {};
                        now.setHours(0, 0, 0, 0);
                        bets = banking.bets.filter(function (bet) {
                            var a = new Date(bet.date);
                            a.setHours(0, 0, 0, 0);
                            return now.getTime() === a.getTime();
                        });
                        bets.map(function (bet) {
                            bet.plays.map(function (play) {
                                if (play.playNumbers.first) {
                                    aux[play.playNumbers.first] = !aux[play.playNumbers.first] ? 1 : aux[play.playNumbers.first] + 1;
                                }
                                if (play.playNumbers.second) {
                                    aux[play.playNumbers.second] = !aux[play.playNumbers.second] ? 1 : aux[play.playNumbers.second] + 1;
                                }
                                if (play.playNumbers.third) {
                                    aux[play.playNumbers.third] = !aux[play.playNumbers.third] ? 1 : aux[play.playNumbers.third] + 1;
                                }
                            });
                        });
                        for (i = 0; i < Object.keys(aux).length; i++) {
                            key = Object.keys(aux)[i];
                            value = aux[key];
                            numbers.push({
                                amount: value,
                                number: parseInt(key)
                            });
                        }
                        numbers.sort(function (a, b) { return (a.amount < b.amount ? 1 : b.amount < a.amount ? -1 : 0); });
                        numbers = numbers.slice(0, 10);
                        return [2 /*return*/, {
                                numbers: numbers
                            }];
                }
            });
        });
    };
    DashboardService.prototype.getConsortiumPlayedNumbersStatistics = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var consortiums, consortium, bankings, numbers, now, aux, _i, bankings_4, banking, bets, i, key, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.consortiumModel.find({ ownerUserId: loggedUser._id }).exec()];
                    case 1:
                        consortiums = _a.sent();
                        if (consortiums.length === 0) {
                            throw new common_1.BadRequestException();
                        }
                        consortium = consortiums.pop();
                        return [4 /*yield*/, this.bankingModel.find({ consortiumId: consortium._id }).exec()];
                    case 2:
                        bankings = _a.sent();
                        numbers = [];
                        now = new Date();
                        aux = {};
                        for (_i = 0, bankings_4 = bankings; _i < bankings_4.length; _i++) {
                            banking = bankings_4[_i];
                            now.setHours(0, 0, 0, 0);
                            bets = banking.bets.filter(function (bet) {
                                var a = new Date(bet.date);
                                a.setHours(0, 0, 0, 0);
                                return now.getTime() === a.getTime();
                            });
                            bets.map(function (bet) {
                                bet.plays.map(function (play) {
                                    if (play.playNumbers.first) {
                                        aux[play.playNumbers.first] = !aux[play.playNumbers.first]
                                            ? 1
                                            : aux[play.playNumbers.first] + 1;
                                    }
                                    if (play.playNumbers.second) {
                                        aux[play.playNumbers.second] = !aux[play.playNumbers.second]
                                            ? 1
                                            : aux[play.playNumbers.second] + 1;
                                    }
                                    if (play.playNumbers.third) {
                                        aux[play.playNumbers.third] = !aux[play.playNumbers.third]
                                            ? 1
                                            : aux[play.playNumbers.third] + 1;
                                    }
                                });
                            });
                        }
                        for (i = 0; i < Object.keys(aux).length; i++) {
                            key = Object.keys(aux)[i];
                            value = aux[key];
                            numbers.push({
                                amount: value,
                                number: parseInt(key)
                            });
                        }
                        numbers.sort(function (a, b) { return (a.amount < b.amount ? 1 : b.amount < a.amount ? -1 : 0); });
                        numbers = numbers.slice(0, 10);
                        return [2 /*return*/, {
                                numbers: numbers
                            }];
                }
            });
        });
    };
    DashboardService.prototype.getBankingsStatistics = function (loggedUser) {
        var e_6, _a;
        return __awaiter(this, void 0, void 0, function () {
            var bankings, consortiums, consortium, bankingsDto, bankings_5, bankings_5_1, banking, _b, _c, e_6_1;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        bankings = [];
                        if (!(loggedUser.role === role_1.Role.consortium)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.consortiumModel.find({ ownerUserId: loggedUser._id }).exec()];
                    case 1:
                        consortiums = _e.sent();
                        if (consortiums.length === 0) {
                            throw new common_1.BadRequestException();
                        }
                        consortium = consortiums.pop();
                        return [4 /*yield*/, this.bankingModel.find({ consortiumId: consortium._id }).exec()];
                    case 2:
                        bankings = _e.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.bankingModel.find().exec()];
                    case 4:
                        //If is admin
                        bankings = _e.sent();
                        _e.label = 5;
                    case 5:
                        bankingsDto = [];
                        _e.label = 6;
                    case 6:
                        _e.trys.push([6, 21, 22, 27]);
                        bankings_5 = __asyncValues(bankings);
                        _e.label = 7;
                    case 7: return [4 /*yield*/, bankings_5.next()];
                    case 8:
                        if (!(bankings_5_1 = _e.sent(), !bankings_5_1.done)) return [3 /*break*/, 20];
                        banking = bankings_5_1.value;
                        _c = (_b = bankingsDto).push;
                        _d = {
                            _id: banking._id,
                            name: banking.name
                        };
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.cancelled], PosibleSums.count)];
                    case 9:
                        _d.cancelled = _e.sent();
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.expired], PosibleSums.count)];
                    case 10:
                        _d.expired = _e.sent();
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.claimed], PosibleSums.count)];
                    case 11:
                        _d.claimed = _e.sent();
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.pending], PosibleSums.count)];
                    case 12:
                        _d.pending = _e.sent();
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.winner], PosibleSums.count)];
                    case 13:
                        _d.winner = _e.sent();
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.loser], PosibleSums.count)];
                    case 14:
                        _d.loser = _e.sent(),
                            _d.total = banking.bets.length;
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.expired, bet_status_1.BetStatus.claimed, bet_status_1.BetStatus.pending, bet_status_1.BetStatus.winner, bet_status_1.BetStatus.loser], PosibleSums.amount)];
                    case 15:
                        _d.profits = _e.sent();
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.claimed, bet_status_1.BetStatus.winner], PosibleSums.amountWin)];
                    case 16:
                        _d.prizes = _e.sent();
                        return [4 /*yield*/, this.sumBets(banking.bets, [bet_status_1.BetStatus.pending], PosibleSums.amountWin)];
                    case 17:
                        _d.pendingPrizes = _e.sent();
                        return [4 /*yield*/, banking.calculateBalance()];
                    case 18:
                        _c.apply(_b, [(_d.balance = _e.sent(),
                                _d)]);
                        _e.label = 19;
                    case 19: return [3 /*break*/, 7];
                    case 20: return [3 /*break*/, 27];
                    case 21:
                        e_6_1 = _e.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 27];
                    case 22:
                        _e.trys.push([22, , 25, 26]);
                        if (!(bankings_5_1 && !bankings_5_1.done && (_a = bankings_5["return"]))) return [3 /*break*/, 24];
                        return [4 /*yield*/, _a.call(bankings_5)];
                    case 23:
                        _e.sent();
                        _e.label = 24;
                    case 24: return [3 /*break*/, 26];
                    case 25:
                        if (e_6) throw e_6.error;
                        return [7 /*endfinally*/];
                    case 26: return [7 /*endfinally*/];
                    case 27: return [2 /*return*/, bankingsDto];
                }
            });
        });
    };
    DashboardService.prototype.getGraphConsortiumStatistics = function () {
        var e_7, _a;
        return __awaiter(this, void 0, void 0, function () {
            var consortiumsDto, consortiums, consortiums_3, consortiums_3_1, consortium, balance, e_7_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        consortiumsDto = [];
                        return [4 /*yield*/, this.consortiumModel.find().exec()];
                    case 1:
                        consortiums = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 8, 9, 14]);
                        consortiums_3 = __asyncValues(consortiums);
                        _b.label = 3;
                    case 3: return [4 /*yield*/, consortiums_3.next()];
                    case 4:
                        if (!(consortiums_3_1 = _b.sent(), !consortiums_3_1.done)) return [3 /*break*/, 7];
                        consortium = consortiums_3_1.value;
                        return [4 /*yield*/, consortium.calculateBalance()];
                    case 5:
                        balance = _b.sent();
                        consortiumsDto.push({
                            _id: consortium._id,
                            name: consortium.name,
                            value: balance
                        });
                        _b.label = 6;
                    case 6: return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_7_1 = _b.sent();
                        e_7 = { error: e_7_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _b.trys.push([9, , 12, 13]);
                        if (!(consortiums_3_1 && !consortiums_3_1.done && (_a = consortiums_3["return"]))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _a.call(consortiums_3)];
                    case 10:
                        _b.sent();
                        _b.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_7) throw e_7.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/, consortiumsDto];
                }
            });
        });
    };
    DashboardService.prototype.getGraphBankingStatistics = function (loggedUser) {
        var e_8, _a;
        return __awaiter(this, void 0, void 0, function () {
            var bankingsDto, bankings, consortiums, consortium, bankings_6, bankings_6_1, banking, balance, e_8_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        bankingsDto = [];
                        bankings = [];
                        if (!(loggedUser.role === role_1.Role.consortium)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.consortiumModel.find({ ownerUserId: loggedUser._id }).exec()];
                    case 1:
                        consortiums = _b.sent();
                        if (consortiums.length === 0) {
                            throw new common_1.BadRequestException();
                        }
                        consortium = consortiums.pop();
                        return [4 /*yield*/, this.bankingModel.find({ consortiumId: consortium._id }).exec()];
                    case 2:
                        bankings = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.bankingModel.find().exec()];
                    case 4:
                        //If is admin
                        bankings = _b.sent();
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 11, 12, 17]);
                        bankings_6 = __asyncValues(bankings);
                        _b.label = 6;
                    case 6: return [4 /*yield*/, bankings_6.next()];
                    case 7:
                        if (!(bankings_6_1 = _b.sent(), !bankings_6_1.done)) return [3 /*break*/, 10];
                        banking = bankings_6_1.value;
                        return [4 /*yield*/, banking.calculateBalance()];
                    case 8:
                        balance = _b.sent();
                        bankingsDto.push({
                            _id: banking._id,
                            name: banking.name,
                            value: balance
                        });
                        _b.label = 9;
                    case 9: return [3 /*break*/, 6];
                    case 10: return [3 /*break*/, 17];
                    case 11:
                        e_8_1 = _b.sent();
                        e_8 = { error: e_8_1 };
                        return [3 /*break*/, 17];
                    case 12:
                        _b.trys.push([12, , 15, 16]);
                        if (!(bankings_6_1 && !bankings_6_1.done && (_a = bankings_6["return"]))) return [3 /*break*/, 14];
                        return [4 /*yield*/, _a.call(bankings_6)];
                    case 13:
                        _b.sent();
                        _b.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        if (e_8) throw e_8.error;
                        return [7 /*endfinally*/];
                    case 16: return [7 /*endfinally*/];
                    case 17: return [2 /*return*/, bankingsDto];
                }
            });
        });
    };
    DashboardService.prototype.getGraphBankingBalanceStatistics = function (loggedUser) {
        var e_9, _a;
        return __awaiter(this, void 0, void 0, function () {
            var bankings, data, banking, dates, i, _b, _c, dates_1, dates_1_1, date, balance, e_9_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.bankingModel.find({ ownerUserId: loggedUser._id }).exec()];
                    case 1:
                        bankings = _d.sent();
                        if (bankings.length === 0) {
                            throw new common_1.BadRequestException();
                        }
                        data = [];
                        banking = bankings.pop();
                        dates = [];
                        i = 0;
                        _d.label = 2;
                    case 2:
                        if (!(i < 30)) return [3 /*break*/, 5];
                        _c = (_b = dates).unshift;
                        return [4 /*yield*/, this.sumDate(-i)];
                    case 3:
                        _c.apply(_b, [_d.sent()]);
                        _d.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        _d.trys.push([5, 11, 12, 17]);
                        dates_1 = __asyncValues(dates);
                        _d.label = 6;
                    case 6: return [4 /*yield*/, dates_1.next()];
                    case 7:
                        if (!(dates_1_1 = _d.sent(), !dates_1_1.done)) return [3 /*break*/, 10];
                        date = dates_1_1.value;
                        return [4 /*yield*/, this.getBalanceByDate(banking.transactions, date)];
                    case 8:
                        balance = _d.sent();
                        data.push({
                            name: date.toISOString(),
                            value: balance
                        });
                        _d.label = 9;
                    case 9: return [3 /*break*/, 6];
                    case 10: return [3 /*break*/, 17];
                    case 11:
                        e_9_1 = _d.sent();
                        e_9 = { error: e_9_1 };
                        return [3 /*break*/, 17];
                    case 12:
                        _d.trys.push([12, , 15, 16]);
                        if (!(dates_1_1 && !dates_1_1.done && (_a = dates_1["return"]))) return [3 /*break*/, 14];
                        return [4 /*yield*/, _a.call(dates_1)];
                    case 13:
                        _d.sent();
                        _d.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        if (e_9) throw e_9.error;
                        return [7 /*endfinally*/];
                    case 16: return [7 /*endfinally*/];
                    case 17: return [2 /*return*/, data];
                }
            });
        });
    };
    DashboardService.prototype.getGraphConsortiumBankingBalanceStatistics = function (loggedUser) {
        var e_10, _a, e_11, _b;
        return __awaiter(this, void 0, void 0, function () {
            var consortium, bankings, data, dates, i, _c, _d, bankings_7, bankings_7_1, banking, series, dates_2, dates_2_1, date, balance, e_11_1, e_10_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.consortiumModel.findOne({ ownerUserId: loggedUser._id }).exec()];
                    case 1:
                        consortium = _e.sent();
                        if (!consortium) {
                            throw new common_1.BadRequestException();
                        }
                        return [4 /*yield*/, this.bankingModel.find({ consortiumId: consortium._id }).exec()];
                    case 2:
                        bankings = _e.sent();
                        data = [];
                        dates = [];
                        i = 0;
                        _e.label = 3;
                    case 3:
                        if (!(i < 30)) return [3 /*break*/, 6];
                        _d = (_c = dates).unshift;
                        return [4 /*yield*/, this.sumDate(-i)];
                    case 4:
                        _d.apply(_c, [_e.sent()]);
                        _e.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6:
                        _e.trys.push([6, 24, 25, 30]);
                        bankings_7 = __asyncValues(bankings);
                        _e.label = 7;
                    case 7: return [4 /*yield*/, bankings_7.next()];
                    case 8:
                        if (!(bankings_7_1 = _e.sent(), !bankings_7_1.done)) return [3 /*break*/, 23];
                        banking = bankings_7_1.value;
                        series = [];
                        _e.label = 9;
                    case 9:
                        _e.trys.push([9, 15, 16, 21]);
                        dates_2 = (e_11 = void 0, __asyncValues(dates));
                        _e.label = 10;
                    case 10: return [4 /*yield*/, dates_2.next()];
                    case 11:
                        if (!(dates_2_1 = _e.sent(), !dates_2_1.done)) return [3 /*break*/, 14];
                        date = dates_2_1.value;
                        return [4 /*yield*/, this.getBalanceByDate(banking.transactions, date)];
                    case 12:
                        balance = _e.sent();
                        series.push({
                            name: date.toISOString(),
                            value: balance
                        });
                        _e.label = 13;
                    case 13: return [3 /*break*/, 10];
                    case 14: return [3 /*break*/, 21];
                    case 15:
                        e_11_1 = _e.sent();
                        e_11 = { error: e_11_1 };
                        return [3 /*break*/, 21];
                    case 16:
                        _e.trys.push([16, , 19, 20]);
                        if (!(dates_2_1 && !dates_2_1.done && (_b = dates_2["return"]))) return [3 /*break*/, 18];
                        return [4 /*yield*/, _b.call(dates_2)];
                    case 17:
                        _e.sent();
                        _e.label = 18;
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        if (e_11) throw e_11.error;
                        return [7 /*endfinally*/];
                    case 20: return [7 /*endfinally*/];
                    case 21:
                        data.push({
                            name: banking.name,
                            series: series
                        });
                        _e.label = 22;
                    case 22: return [3 /*break*/, 7];
                    case 23: return [3 /*break*/, 30];
                    case 24:
                        e_10_1 = _e.sent();
                        e_10 = { error: e_10_1 };
                        return [3 /*break*/, 30];
                    case 25:
                        _e.trys.push([25, , 28, 29]);
                        if (!(bankings_7_1 && !bankings_7_1.done && (_a = bankings_7["return"]))) return [3 /*break*/, 27];
                        return [4 /*yield*/, _a.call(bankings_7)];
                    case 26:
                        _e.sent();
                        _e.label = 27;
                    case 27: return [3 /*break*/, 29];
                    case 28:
                        if (e_10) throw e_10.error;
                        return [7 /*endfinally*/];
                    case 29: return [7 /*endfinally*/];
                    case 30: return [2 /*return*/, data];
                }
            });
        });
    };
    DashboardService.prototype.getBalanceByDate = function (transactions, date) {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                balance = 0;
                transactions.forEach(function (item) {
                    if (item.createdAt < date) {
                        balance += item.amount;
                    }
                });
                return [2 /*return*/, balance];
            });
        });
    };
    DashboardService.prototype.sumDate = function (days) {
        return __awaiter(this, void 0, void 0, function () {
            var now;
            return __generator(this, function (_a) {
                now = new Date();
                return [2 /*return*/, new Date(now.getTime() + 24 * 60 * 60 * 1000 * days)];
            });
        });
    };
    DashboardService.prototype.sumBets = function (bets, betStatus, key) {
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
    DashboardService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(consortium_1.Consortium.name)),
        __param(1, mongoose_1.InjectModel(banking_1.Banking.name)),
        __param(2, mongoose_1.InjectModel(web_user_1.WebUser.name))
    ], DashboardService);
    return DashboardService;
}());
exports.DashboardService = DashboardService;
var PosibleSums;
(function (PosibleSums) {
    PosibleSums[PosibleSums["amount"] = 0] = "amount";
    PosibleSums[PosibleSums["amountWin"] = 1] = "amountWin";
    PosibleSums[PosibleSums["count"] = 2] = "count";
})(PosibleSums || (PosibleSums = {}));
