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
exports.TokenService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var crypto_1 = require("crypto");
var refresh_token_1 = require("@database/datamodels/schemas/refresh.token");
var const_app_1 = require("@utils/const.app");
var auth_user_service_1 = require("@auth.user/auth.user.service");
var response_payload_dto_1 = require("@users/dtos/response.payload.dto");
var auth_service_1 = require("@auth/auth.service");
var response_dto_1 = require("@utils/dtos/response.dto");
var TokenService = /** @class */ (function () {
    function TokenService(userAuthService, authService, refreshTokenModel, connection) {
        this.userAuthService = userAuthService;
        this.authService = authService;
        this.refreshTokenModel = refreshTokenModel;
        this.connection = connection;
        this.logger = new common_1.Logger(TokenService_1.name);
    }
    TokenService_1 = TokenService;
    TokenService.prototype.getRefreshToken = function (ipAdress, refreshToken, logged) {
        return __awaiter(this, void 0, void 0, function () {
            var user, responsePayload, responseSignInDto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(ipAdress === refreshToken.ipAddress)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userAuthService.getUser(refreshToken.userId)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.InternalServerErrorException();
                        }
                        responsePayload = new response_payload_dto_1.ResponsePayload();
                        responsePayload.role = user.role;
                        responsePayload.userId = user._id;
                        return [4 /*yield*/, this.authService.getToken(responsePayload, ipAdress, logged)];
                    case 2:
                        responseSignInDto = _a.sent();
                        this.logger.debug('User ' + user);
                        return [2 /*return*/, responseSignInDto];
                    case 3: throw new common_1.UnauthorizedException();
                }
            });
        });
    };
    TokenService.prototype.saveRefreshTokenGenerated = function (userIp, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var session, refreshTokenModel, value, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.startSession()];
                    case 1:
                        session = _a.sent();
                        session.startTransaction();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, 6, 7]);
                        return [4 /*yield*/, this.refreshTokenModel.findOne({ userId: userId }).exec()];
                    case 3:
                        refreshTokenModel = _a.sent();
                        value = crypto_1.randomBytes(64).toString('hex');
                        refreshTokenModel.refreshTokenId = value;
                        refreshTokenModel.ipAddress = userIp;
                        return [4 /*yield*/, refreshTokenModel.save()];
                    case 4:
                        _a.sent();
                        session.commitTransaction();
                        return [2 /*return*/, { value: value, userId: userId }];
                    case 5:
                        error_1 = _a.sent();
                        this.logger.error(const_app_1.ConstApp.REFRESH_TOKEN_ERROR + error_1);
                        session.abortTransaction();
                        throw new common_1.InternalServerErrorException(const_app_1.ConstApp.REFRESH_TOKEN_ERROR);
                    case 6:
                        session.endSession();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    TokenService.prototype.deleteRefreshToken = function (ipAddress, user, required) {
        return __awaiter(this, void 0, void 0, function () {
            var responseDto, refreshTokenModel, userId, session, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responseDto = new response_dto_1.ResponseDto();
                        refreshTokenModel = new this.refreshTokenModel();
                        userId = user._id;
                        if (!required) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.refreshTokenModel.findOne({ userId: userId, ipAddress: ipAddress })];
                    case 1:
                        refreshTokenModel = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.refreshTokenModel.findOne({ userId: userId })];
                    case 3:
                        refreshTokenModel = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (refreshTokenModel == null) {
                            throw new common_1.ForbiddenException(const_app_1.ConstApp.COULD_NOT_LOG_OUT_ERROR);
                        }
                        return [4 /*yield*/, this.connection.startSession()];
                    case 5:
                        session = _a.sent();
                        session.startTransaction();
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, 9, 10]);
                        refreshTokenModel.ipAddress = '';
                        refreshTokenModel.refreshTokenId = '';
                        return [4 /*yield*/, refreshTokenModel.save()];
                    case 7:
                        refreshTokenModel = _a.sent();
                        session.commitTransaction();
                        responseDto.message = const_app_1.ConstApp.LOG_OUT_OK;
                        responseDto.statusCode = common_1.HttpStatus.OK;
                        if (!refreshTokenModel) {
                            throw new common_1.InternalServerErrorException(const_app_1.ConstApp.COULD_NOT_LOG_OUT_ERROR);
                        }
                        return [3 /*break*/, 10];
                    case 8:
                        e_1 = _a.sent();
                        session.abortTransaction();
                        throw new common_1.InternalServerErrorException(const_app_1.ConstApp.COULD_NOT_LOG_OUT_ERROR);
                    case 9:
                        session.endSession();
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, responseDto];
                }
            });
        });
    };
    TokenService.prototype.getRefreshTokenByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.refreshTokenModel.findOne({ userId: userId }).exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TokenService.prototype.createRefreshToken = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshToken = new this.refreshTokenModel();
                        refreshToken.userId = _id;
                        refreshToken.refreshTokenId = null;
                        refreshToken.ipAddress = '';
                        return [4 /*yield*/, refreshToken.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TokenService.prototype.getRefreshTokenValidated = function (userId, refreshTokenId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.refreshTokenModel.findOne({ userId: userId, refreshTokenId: refreshTokenId }).exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    var TokenService_1;
    TokenService = TokenService_1 = __decorate([
        common_1.Injectable(),
        __param(0, common_1.Inject(common_1.forwardRef(function () { return auth_user_service_1.AuthUserService; }))),
        __param(1, common_1.Inject(common_1.forwardRef(function () { return auth_service_1.AuthService; }))),
        __param(2, mongoose_1.InjectModel(refresh_token_1.RefreshToken.name)),
        __param(3, mongoose_1.InjectConnection(const_app_1.ConstApp.USER))
    ], TokenService);
    return TokenService;
}());
exports.TokenService = TokenService;
