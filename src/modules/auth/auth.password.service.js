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
exports.AuthPasswordService = void 0;
var common_1 = require("@nestjs/common");
var const_app_1 = require("@utils/const.app");
var mongoose_1 = require("@nestjs/mongoose");
var something_went_wrong_exception_1 = require("@common/exceptions/something.went.wrong.exception");
var role_1 = require("@database/datamodels/enums/role");
var response_dto_1 = require("@utils/dtos/response.dto");
var sign_in_credentials_dto_1 = require("@auth/dtos/sign.in.credentials.dto");
var AuthPasswordService = /** @class */ (function () {
    function AuthPasswordService(userAuthService, tokenService, connection) {
        this.userAuthService = userAuthService;
        this.tokenService = tokenService;
        this.connection = connection;
        this.logger = new common_1.Logger(AuthPasswordService_1.name);
    }
    AuthPasswordService_1 = AuthPasswordService;
    AuthPasswordService.prototype.changePasswordRemember = function (userIp, changeOldPasswordDto, userLogged) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, oldPassword, newPassword, verifyPassword, responseDto, signInCredentialsDto, changed, user, refreshToken, valid, session, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = changeOldPasswordDto._id, oldPassword = changeOldPasswordDto.oldPassword, newPassword = changeOldPasswordDto.newPassword, verifyPassword = changeOldPasswordDto.verifyPassword;
                        responseDto = new response_dto_1.ResponseDto();
                        signInCredentialsDto = new sign_in_credentials_dto_1.SignInCredentialsDto();
                        if (newPassword !== verifyPassword) {
                            throw new common_1.BadRequestException(const_app_1.ConstApp.PASSWORD_NOT_MATCH);
                        }
                        if (oldPassword === newPassword) {
                            throw new common_1.BadRequestException(const_app_1.ConstApp.PASSWORD_SHOULD_NOT_BE_THE_SAME_ERROR);
                        }
                        return [4 /*yield*/, this.userAuthService.getUserByIdComplete(_id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.BadRequestException(const_app_1.ConstApp.USER_NOT_FOUND);
                        }
                        return [4 /*yield*/, this.tokenService.getRefreshTokenByUserId(userLogged._id)];
                    case 2:
                        refreshToken = _a.sent();
                        if (!refreshToken) {
                            throw new something_went_wrong_exception_1.SomethingWentWrongException();
                        }
                        this.logger.debug(' refreshToken userId: ' + refreshToken.userId + '  userId: ' + user._id);
                        if (refreshToken.userId.toString() !== user._id.toString()) {
                            throw new something_went_wrong_exception_1.SomethingWentWrongException();
                        }
                        if (refreshToken.ipAddress === '' || refreshToken.refreshTokenId === '') {
                            /**
                             * Esta exception no tiene mensaje porque
                             * se supone que esta cambiando la pass sin estar loggeado
                             * **/
                            throw new common_1.BadRequestException();
                        }
                        if (refreshToken.ipAddress !== userIp) {
                            /**
                             * Esta exception no tiene mensaje porque
                             * se supone que esta intentando acceder de otro dispositivo
                             * **/
                            throw new common_1.BadRequestException();
                        }
                        signInCredentialsDto.username = user.username;
                        signInCredentialsDto.password = oldPassword;
                        return [4 /*yield*/, this.userAuthService.validateUserPassword(signInCredentialsDto)];
                    case 3:
                        valid = _a.sent();
                        this.logger.debug('Is valid: ' + valid);
                        if (!valid) {
                            throw new common_1.BadRequestException(const_app_1.ConstApp.PASSWORD_NOT_MATCH);
                        }
                        return [4 /*yield*/, this.connection.startSession()];
                    case 4:
                        session = _a.sent();
                        session.startTransaction();
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, 8, 9]);
                        return [4 /*yield*/, this.changeUserPassword(user, newPassword, userLogged)];
                    case 6:
                        changed = _a.sent();
                        session.commitTransaction();
                        responseDto.message = 'Password changed';
                        responseDto.statusCode = 200;
                        return [3 /*break*/, 9];
                    case 7:
                        e_1 = _a.sent();
                        session.abortTransaction();
                        if (e_1 instanceof common_1.ForbiddenException) {
                            throw new common_1.ForbiddenException(const_app_1.ConstApp.UNABLE_TO_CHANGE_PASSWORD);
                        }
                        if (e_1 instanceof common_1.BadRequestException) {
                            throw new common_1.BadRequestException(const_app_1.ConstApp.PASSWORD_SHOULD_NOT_BE_OLD);
                        }
                        throw new something_went_wrong_exception_1.SomethingWentWrongException();
                    case 8:
                        session.endSession();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, responseDto];
                }
            });
        });
    };
    AuthPasswordService.prototype.changePassword = function (userIp, changePasswordDto, userLogged) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, newPassword, verifyPassword, responseDto, changed, user, session, _a, e_2, e_3, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _id = changePasswordDto._id, newPassword = changePasswordDto.newPassword, verifyPassword = changePasswordDto.verifyPassword;
                        responseDto = new response_dto_1.ResponseDto();
                        if (newPassword !== verifyPassword) {
                            throw new common_1.BadRequestException(const_app_1.ConstApp.PASSWORD_NOT_MATCH);
                        }
                        return [4 /*yield*/, this.userAuthService.getUserByIdComplete(_id)];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new common_1.BadRequestException(const_app_1.ConstApp.USER_NOT_FOUND);
                        }
                        return [4 /*yield*/, this.connection.startSession()];
                    case 2:
                        session = _b.sent();
                        session.startTransaction();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 16, 17, 18]);
                        _a = userLogged.role;
                        switch (_a) {
                            case role_1.Role.admin: return [3 /*break*/, 4];
                            case role_1.Role.consortium: return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 14];
                    case 4:
                        if (user.role === role_1.Role.admin) {
                            throw new common_1.ForbiddenException(const_app_1.ConstApp.UNAUTHORIZE_TO_CHANGE_PASSWORD);
                        }
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.changeUserPassword(user, newPassword, userLogged)];
                    case 6:
                        changed = _b.sent();
                        session.commitTransaction();
                        return [3 /*break*/, 8];
                    case 7:
                        e_2 = _b.sent();
                        throw new common_1.BadRequestException(const_app_1.ConstApp.PASSWORD_SHOULD_NOT_BE_OLD);
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        if (user.role === role_1.Role.consortium || user.role === role_1.Role.admin) {
                            throw new common_1.ForbiddenException(const_app_1.ConstApp.CANNOT_CHANGE_PASSWORD_OF_THE_SAME_ROLE);
                        }
                        _b.label = 10;
                    case 10:
                        _b.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, this.changeUserPassword(user, newPassword, userLogged)];
                    case 11:
                        changed = _b.sent();
                        session.commitTransaction();
                        return [3 /*break*/, 13];
                    case 12:
                        e_3 = _b.sent();
                        throw new common_1.BadRequestException(const_app_1.ConstApp.PASSWORD_SHOULD_NOT_BE_OLD);
                    case 13: return [3 /*break*/, 15];
                    case 14: throw new common_1.ForbiddenException(const_app_1.ConstApp.CANNOT_CHANGE_PASSWORD_OF_THE_SAME_ROLE);
                    case 15:
                        responseDto.message = 'Password changed';
                        responseDto.statusCode = 200;
                        return [3 /*break*/, 18];
                    case 16:
                        e_4 = _b.sent();
                        session.abortTransaction();
                        if (e_4 instanceof common_1.ForbiddenException) {
                            throw new common_1.ForbiddenException(const_app_1.ConstApp.UNABLE_TO_CHANGE_PASSWORD);
                        }
                        if (e_4 instanceof common_1.BadRequestException) {
                            throw new common_1.BadRequestException(const_app_1.ConstApp.PASSWORD_SHOULD_NOT_BE_OLD);
                        }
                        throw new something_went_wrong_exception_1.SomethingWentWrongException();
                    case 17:
                        session.endSession();
                        return [7 /*endfinally*/];
                    case 18: return [2 /*return*/, responseDto];
                }
            });
        });
    };
    AuthPasswordService.prototype.changeUserPassword = function (user, newPassword, userLogged) {
        return __awaiter(this, void 0, void 0, function () {
            var userSaved, _a, valid;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userSaved = false;
                        _a = user;
                        return [4 /*yield*/, this.userAuthService.hashPassword(newPassword, user.salt)];
                    case 1:
                        _a.password = _b.sent();
                        return [4 /*yield*/, this.userAuthService.validateOldPassword(user, newPassword)];
                    case 2:
                        valid = _b.sent();
                        if (!!valid) return [3 /*break*/, 5];
                        user.oldPasswords.push(user.password);
                        return [4 /*yield*/, this.tokenService.deleteRefreshToken(null, user, false)];
                    case 3:
                        _b.sent();
                        user.modificationUserId = userLogged._id;
                        return [4 /*yield*/, user.save()];
                    case 4:
                        _b.sent();
                        userSaved = true;
                        return [3 /*break*/, 6];
                    case 5:
                        userSaved = false;
                        throw new common_1.BadRequestException(const_app_1.ConstApp.PASSWORD_SHOULD_NOT_BE_OLD);
                    case 6: return [2 /*return*/, userSaved];
                }
            });
        });
    };
    var AuthPasswordService_1;
    AuthPasswordService = AuthPasswordService_1 = __decorate([
        common_1.Injectable(),
        __param(2, mongoose_1.InjectConnection(const_app_1.ConstApp.USER))
    ], AuthPasswordService);
    return AuthPasswordService;
}());
exports.AuthPasswordService = AuthPasswordService;
