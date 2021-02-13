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
exports.ChatService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var consortium_1 = require("@database/datamodels/schemas/consortium");
var banking_1 = require("@database/datamodels/schemas/banking");
var role_1 = require("@database/datamodels/enums/role");
var message_1 = require("@database/datamodels/schemas/message");
var const_app_1 = require("@utils/const.app");
var ChatService = /** @class */ (function () {
    function ChatService(bankingModel, consortiumModel, messageModel, connection) {
        this.bankingModel = bankingModel;
        this.consortiumModel = consortiumModel;
        this.messageModel = messageModel;
        this.connection = connection;
        this.logger = new common_1.Logger(ChatService_1.name);
    }
    ChatService_1 = ChatService;
    ChatService.prototype.getAll = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var id, messagesDto, messages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getIdOfConsortiumBanking(loggedUser)];
                    case 1:
                        id = _a.sent();
                        if (!id)
                            throw new common_1.BadRequestException(const_app_1.ConstApp.ESTABLISHMENT_NOT_FOUND);
                        messagesDto = [];
                        return [4 /*yield*/, this.messageModel
                                .find()
                                .or([{ originId: id }, { destinationId: id }])
                                .exec()];
                    case 2:
                        messages = _a.sent();
                        return [4 /*yield*/, this.getMessages(messages, id, loggedUser, messagesDto)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChatService.prototype.getAllUnreadMessages = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var id, messagesDto, messages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getIdOfConsortiumBanking(loggedUser)];
                    case 1:
                        id = _a.sent();
                        if (!id)
                            throw new common_1.BadRequestException(const_app_1.ConstApp.ESTABLISHMENT_NOT_FOUND);
                        messagesDto = [];
                        return [4 /*yield*/, this.messageModel
                                .find()
                                .and([{ destinationId: id }, { readed: false }])
                                .exec()];
                    case 2:
                        messages = _a.sent();
                        return [4 /*yield*/, this.getMessages(messages, id, loggedUser, messagesDto)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChatService.prototype.getMessages = function (messages, id, loggedUser, messagesDto) {
        var messages_1, messages_1_1;
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var msg, msgDto, sender, destinationName, banking, banking, consortium, originName, banking, banking, consortium, e_1_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 18, 19, 24]);
                        messages_1 = __asyncValues(messages);
                        _b.label = 1;
                    case 1: return [4 /*yield*/, messages_1.next()];
                    case 2:
                        if (!(messages_1_1 = _b.sent(), !messages_1_1.done)) return [3 /*break*/, 17];
                        msg = messages_1_1.value;
                        return [4 /*yield*/, this.mapToDto(msg)];
                    case 3:
                        msgDto = _b.sent();
                        sender = false;
                        if (!(msgDto.originId.toString() === id.toString())) return [3 /*break*/, 9];
                        destinationName = void 0;
                        if (!(loggedUser.role === role_1.Role.consortium)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.bankingModel.findById(msg.destinationId).exec()];
                    case 4:
                        banking = _b.sent();
                        destinationName = banking.name;
                        _b.label = 5;
                    case 5:
                        if (!(loggedUser.role === role_1.Role.banker)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.bankingModel.findById(id).exec()];
                    case 6:
                        banking = _b.sent();
                        return [4 /*yield*/, this.consortiumModel.findById(banking.consortiumId).exec()];
                    case 7:
                        consortium = _b.sent();
                        destinationName = consortium.name;
                        _b.label = 8;
                    case 8:
                        msgDto.destinationName = destinationName;
                        sender = true;
                        return [3 /*break*/, 15];
                    case 9:
                        originName = void 0;
                        if (!(loggedUser.role === role_1.Role.consortium)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.bankingModel.findById(msg.originId).exec()];
                    case 10:
                        banking = _b.sent();
                        originName = banking.name;
                        _b.label = 11;
                    case 11:
                        if (!(loggedUser.role === role_1.Role.banker)) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.bankingModel.findById(id).exec()];
                    case 12:
                        banking = _b.sent();
                        return [4 /*yield*/, this.consortiumModel.findById(banking.consortiumId).exec()];
                    case 13:
                        consortium = _b.sent();
                        originName = consortium.name;
                        _b.label = 14;
                    case 14:
                        msgDto.originName = originName;
                        _b.label = 15;
                    case 15:
                        msgDto.sender = sender;
                        messagesDto.push(msgDto);
                        _b.label = 16;
                    case 16: return [3 /*break*/, 1];
                    case 17: return [3 /*break*/, 24];
                    case 18:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 24];
                    case 19:
                        _b.trys.push([19, , 22, 23]);
                        if (!(messages_1_1 && !messages_1_1.done && (_a = messages_1["return"]))) return [3 /*break*/, 21];
                        return [4 /*yield*/, _a.call(messages_1)];
                    case 20:
                        _b.sent();
                        _b.label = 21;
                    case 21: return [3 /*break*/, 23];
                    case 22:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 23: return [7 /*endfinally*/];
                    case 24: return [2 /*return*/, messagesDto];
                }
            });
        });
    };
    ChatService.prototype.readMessages = function (dto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var id, originId, banking, banking, messages, _i, messages_2, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getIdOfConsortiumBanking(loggedUser)];
                    case 1:
                        id = _a.sent();
                        if (!id)
                            throw new common_1.BadRequestException();
                        if (!(loggedUser.role === role_1.Role.consortium)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.bankingModel.findById(dto.originId).exec()];
                    case 2:
                        banking = _a.sent();
                        originId = banking._id;
                        _a.label = 3;
                    case 3:
                        if (!(loggedUser.role === role_1.Role.banker)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.bankingModel.findById(id).exec()];
                    case 4:
                        banking = _a.sent();
                        originId = banking.consortiumId;
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.messageModel
                            .find()
                            .and([{ originId: originId }, { destinationId: id }, { readed: false }])
                            .exec()];
                    case 6:
                        messages = _a.sent();
                        if (!messages)
                            throw new common_1.BadRequestException(const_app_1.ConstApp.SOMETHING_WRONG_EXCEPTION);
                        _i = 0, messages_2 = messages;
                        _a.label = 7;
                    case 7:
                        if (!(_i < messages_2.length)) return [3 /*break*/, 10];
                        message = messages_2[_i];
                        message.readed = true;
                        console.log('msg', message.message);
                        return [4 /*yield*/, message.save()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 7];
                    case 10: return [2 /*return*/, true];
                }
            });
        });
    };
    ChatService.prototype.create = function (dto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var session, msg, id, destinationId, banking, banking, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.startSession()];
                    case 1:
                        session = _a.sent();
                        session.startTransaction();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 11, 13, 14]);
                        return [4 /*yield*/, this.getIdOfConsortiumBanking(loggedUser)];
                    case 3:
                        id = _a.sent();
                        if (!id)
                            throw new common_1.BadRequestException(const_app_1.ConstApp.ESTABLISHMENT_NOT_FOUND);
                        destinationId = void 0;
                        if (!(loggedUser.role === role_1.Role.consortium)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.bankingModel.findById(dto.destinationId).exec()];
                    case 4:
                        banking = _a.sent();
                        destinationId = banking._id;
                        _a.label = 5;
                    case 5:
                        if (!(loggedUser.role === role_1.Role.banker)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.bankingModel.findById(id).exec()];
                    case 6:
                        banking = _a.sent();
                        destinationId = banking.consortiumId;
                        _a.label = 7;
                    case 7: return [4 /*yield*/, this.consortiumModel.findById(dto.destinationId)];
                    case 8:
                        _a.sent();
                        msg = new this.messageModel({
                            originId: id,
                            destinationId: destinationId,
                            message: dto.message,
                            creationUserId: loggedUser._id,
                            modificationUserId: loggedUser._id,
                            date: new Date(),
                            readed: false
                        });
                        return [4 /*yield*/, msg.save()];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, session.commitTransaction()];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 11:
                        error_1 = _a.sent();
                        return [4 /*yield*/, session.abortTransaction()];
                    case 12:
                        _a.sent();
                        this.logger.error(error_1);
                        if (error_1.code === 11000) {
                            throw new common_1.ConflictException(const_app_1.ConstApp.USERNAME_EXISTS_ERROR);
                        }
                        else {
                            throw new common_1.InternalServerErrorException();
                        }
                        return [3 /*break*/, 14];
                    case 13:
                        session.endSession();
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/, this.mapToDto(msg)];
                }
            });
        });
    };
    ChatService.prototype.getIdOfConsortiumBanking = function (loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, consortiums, bankings;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = loggedUser.role;
                        switch (_a) {
                            case role_1.Role.consortium: return [3 /*break*/, 1];
                            case role_1.Role.banker: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.consortiumModel.find({ ownerUserId: loggedUser._id }).exec()];
                    case 2:
                        consortiums = _b.sent();
                        if (consortiums.length === 0) {
                            throw new common_1.BadRequestException(const_app_1.ConstApp.ESTABLISHMENT_NOT_FOUND);
                        }
                        id = consortiums.pop()._id;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.bankingModel.find({ ownerUserId: loggedUser._id }).exec()];
                    case 4:
                        bankings = _b.sent();
                        if (bankings.length === 0) {
                            throw new common_1.BadRequestException(const_app_1.ConstApp.ESTABLISHMENT_NOT_FOUND);
                        }
                        id = bankings.pop()._id;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, id];
                }
            });
        });
    };
    ChatService.prototype.mapToDto = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, date, message, originId, destinationId, readed;
            return __generator(this, function (_a) {
                _id = msg._id, date = msg.date, message = msg.message, originId = msg.originId, destinationId = msg.destinationId, readed = msg.readed;
                return [2 /*return*/, {
                        _id: _id,
                        date: date,
                        message: message,
                        originId: originId,
                        destinationId: destinationId,
                        readed: readed
                    }];
            });
        });
    };
    var ChatService_1;
    ChatService = ChatService_1 = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(banking_1.Banking.name)),
        __param(1, mongoose_1.InjectModel(consortium_1.Consortium.name)),
        __param(2, mongoose_1.InjectModel(message_1.Message.name)),
        __param(3, mongoose_1.InjectConnection(const_app_1.ConstApp.BANKING))
    ], ChatService);
    return ChatService;
}());
exports.ChatService = ChatService;
