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
exports.TasksService = void 0;
var common_1 = require("@nestjs/common");
var schedule_1 = require("@nestjs/schedule");
var mongoose_1 = require("@nestjs/mongoose");
var consortium_1 = require("@database/datamodels/schemas/consortium");
var banking_1 = require("@database/datamodels/schemas/banking");
var bet_status_1 = require("@database/datamodels/enums/bet.status");
var message_1 = require("@database/datamodels/schemas/message");
var playPool_1 = require("@database/datamodels/schemas/playPool");
var TasksService = /** @class */ (function () {
    function TasksService(consortiumModel, bankingModel, messageModel, playPoolModel) {
        this.consortiumModel = consortiumModel;
        this.bankingModel = bankingModel;
        this.messageModel = messageModel;
        this.playPoolModel = playPoolModel;
        this.logger = new common_1.Logger(TasksService_1.name);
    }
    TasksService_1 = TasksService;
    TasksService.prototype.handleCron = function () {
        this.expireBets();
        this.deleteOldMessages();
        this.deleteOldPlayPools();
    };
    TasksService.prototype.expireBets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var days, dateOffset, myDate, bankings, _i, bankings_1, banking, bets, _a, bets_1, bet;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        days = 5;
                        dateOffset = days * 24 * 3600 * 1000;
                        myDate = new Date();
                        myDate.setTime(myDate.getTime() - dateOffset);
                        return [4 /*yield*/, this.bankingModel.find().exec()];
                    case 1:
                        bankings = _b.sent();
                        for (_i = 0, bankings_1 = bankings; _i < bankings_1.length; _i++) {
                            banking = bankings_1[_i];
                            bets = banking.bets.filter(function (bet) { return [bet_status_1.BetStatus.pending, bet_status_1.BetStatus.winner].includes(bet.betStatus) && bet.date < myDate; });
                            for (_a = 0, bets_1 = bets; _a < bets_1.length; _a++) {
                                bet = bets_1[_a];
                                this.logger.debug(bet.date.toISOString() + ' ' + myDate.toISOString());
                                bet.betStatus = bet_status_1.BetStatus.expired;
                            }
                            banking.save();
                        }
                        this.logger.debug('Se ejecuto expireBets');
                        return [2 /*return*/];
                }
            });
        });
    };
    TasksService.prototype.deleteOldMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var days, dateOffset, myDate, messages, _i, messages_1, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        days = 30;
                        dateOffset = days * 24 * 3600 * 1000;
                        myDate = new Date();
                        myDate.setTime(myDate.getTime() - dateOffset);
                        return [4 /*yield*/, this.messageModel
                                .find({
                                date: {
                                    $lte: myDate
                                }
                            })
                                .exec()];
                    case 1:
                        messages = _a.sent();
                        for (_i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                            msg = messages_1[_i];
                            msg["delete"]();
                        }
                        this.logger.debug('Se ejecuto deleteOldMessages');
                        return [2 /*return*/];
                }
            });
        });
    };
    TasksService.prototype.deleteOldPlayPools = function () {
        return __awaiter(this, void 0, void 0, function () {
            var days, dateOffset, myDate, playPools, _i, playPools_1, playPool;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        days = 5;
                        dateOffset = days * 24 * 3600 * 1000;
                        myDate = new Date();
                        myDate.setTime(myDate.getTime() - dateOffset);
                        return [4 /*yield*/, this.playPoolModel
                                .find({
                                date: {
                                    $lte: myDate
                                }
                            })
                                .exec()];
                    case 1:
                        playPools = _a.sent();
                        for (_i = 0, playPools_1 = playPools; _i < playPools_1.length; _i++) {
                            playPool = playPools_1[_i];
                            playPool["delete"]();
                        }
                        this.logger.debug('Se ejecuto deleteOldPlayPools');
                        return [2 /*return*/];
                }
            });
        });
    };
    var TasksService_1;
    __decorate([
        schedule_1.Cron(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT)
    ], TasksService.prototype, "handleCron");
    TasksService = TasksService_1 = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(consortium_1.Consortium.name)),
        __param(1, mongoose_1.InjectModel(banking_1.Banking.name)),
        __param(2, mongoose_1.InjectModel(message_1.Message.name)),
        __param(3, mongoose_1.InjectModel(playPool_1.PlayPool.name))
    ], TasksService);
    return TasksService;
}());
exports.TasksService = TasksService;
