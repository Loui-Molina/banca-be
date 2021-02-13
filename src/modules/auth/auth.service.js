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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var const_app_1 = require("@utils/const.app");
var response_sign_in_dto_1 = require("@auth/dtos/response.sign.in.dto");
var mongoose_1 = require("@nestjs/mongoose");
var banking_1 = require("@database/datamodels/schemas/banking");
var consortium_1 = require("@database/datamodels/schemas/consortium");
var web_user_1 = require("@database/datamodels/schemas/web.user");
var AuthService = /** @class */ (function () {
    function AuthService(configService, userAuthService, jwtService, tokenService, bankingModel, consortiumModel, webUserModel) {
        this.configService = configService;
        this.userAuthService = userAuthService;
        this.jwtService = jwtService;
        this.tokenService = tokenService;
        this.bankingModel = bankingModel;
        this.consortiumModel = consortiumModel;
        this.webUserModel = webUserModel;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    AuthService_1 = AuthService;
    AuthService.prototype.signUp = function (signUpCredentialsDto, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userAuthService.signUp(signUpCredentialsDto, user).then(function (createdUser) { return createdUser.response; })];
            });
        });
    };
    AuthService.prototype.signIn = function (userIp, signInCredentialsDto) {
        return __awaiter(this, void 0, void 0, function () {
            var responsePayload, responseSignInDto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userAuthService.validateUserPassword(signInCredentialsDto)];
                    case 1:
                        responsePayload = _a.sent();
                        responseSignInDto = new response_sign_in_dto_1.ResponseSignInDto();
                        if (!responsePayload.userId) {
                            throw new common_1.UnauthorizedException(const_app_1.ConstApp.INVALID_CREDENTIALS_ERROR);
                        }
                        return [4 /*yield*/, this.verifyStatus(responsePayload)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getToken(responsePayload, userIp, false)];
                    case 3:
                        responseSignInDto = _a.sent();
                        return [2 /*return*/, responseSignInDto];
                }
            });
        });
    };
    AuthService.prototype.verifyStatus = function (responsePayload) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userAuthService.getUser(responsePayload.userId)];
                    case 1:
                        user = _a.sent();
                        switch (user.role
                        /*case Role.consortium:
                            // eslint-disable-next-line no-case-declarations
                            const consortiums = await this.consortiumModel.findOne({ ownerUserId: user._id });
                            if (consortiums.status === false) {
                                throw new UnauthorizedException(ConstApp.CANNOT_LOGIN);
                            }
                            break;
                        case Role.banker:
                            // eslint-disable-next-line no-case-declarations
                            const banking = await this.bankingModel.findOne({ ownerUserId: user._id });
                            // eslint-disable-next-line no-case-declarations
                            const bankingConsortium = await this.consortiumModel.findOne({ _id: banking.consortiumId });
                            if (banking.status === false || bankingConsortium.status === false) {
                                throw new UnauthorizedException(ConstApp.CANNOT_LOGIN);
                            }
                            break;
                        case Role.admin:
                            break;
                        default:
                            throw new UnauthorizedException(ConstApp.CANNOT_LOGIN);
                            break;*/
                        ) {
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getLoggedUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userAuthService.getUser(user._id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.getToken = function (responsePayload, userIp, logged) {
        return __awaiter(this, void 0, void 0, function () {
            var responseSignInDto, userId, role, payload, refreshToken, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        responseSignInDto = new response_sign_in_dto_1.ResponseSignInDto();
                        userId = responsePayload.userId;
                        role = responsePayload.role;
                        payload = { userId: userId, role: role };
                        return [4 /*yield*/, this.verifyStatus(responsePayload)];
                    case 1:
                        _c.sent();
                        if (!!logged) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.tokenService.saveRefreshTokenGenerated(userIp, userId)];
                    case 2:
                        refreshToken = _c.sent();
                        _a = responseSignInDto;
                        return [4 /*yield*/, this.jwtService.signAsync(refreshToken, {
                                expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES'),
                                secret: this.configService.get('REFRESH_TOKEN_SECRET_KEY')
                            })];
                    case 3:
                        _a.refreshToken = _c.sent();
                        _c.label = 4;
                    case 4:
                        _b = responseSignInDto;
                        return [4 /*yield*/, this.jwtService.signAsync(payload, {
                                expiresIn: this.configService.get('TOKEN_EXPIRES'),
                                secret: this.configService.get('TOKEN_SECRET_KEY')
                            })];
                    case 5:
                        _b.accessToken = _c.sent();
                        responseSignInDto.expiresIn = this.configService.get('TOKEN_EXPIRES');
                        return [2 /*return*/, responseSignInDto];
                }
            });
        });
    };
    AuthService.prototype.logOut = function (ipAdress, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tokenService.deleteRefreshToken(ipAdress, user, true)];
            });
        });
    };
    var AuthService_1;
    AuthService = AuthService_1 = __decorate([
        common_1.Injectable(),
        __param(4, mongoose_1.InjectModel(banking_1.Banking.name)),
        __param(5, mongoose_1.InjectModel(consortium_1.Consortium.name)),
        __param(6, mongoose_1.InjectModel(web_user_1.WebUser.name))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
