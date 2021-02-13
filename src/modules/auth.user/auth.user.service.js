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
exports.AuthUserService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var bcrypt = require("bcrypt");
var response_payload_dto_1 = require("@users/dtos/response.payload.dto");
var const_app_1 = require("@utils/const.app");
var user_created_entity_1 = require("@users/entities/user.created.entity");
var event_1 = require("@database/datamodels/schemas/event");
var AuthUserService = /** @class */ (function () {
    function AuthUserService(usersService, tokenService, connection, eventModel) {
        this.usersService = usersService;
        this.tokenService = tokenService;
        this.connection = connection;
        this.eventModel = eventModel;
        this.logger = new common_1.Logger(AuthUserService_1.name);
    }
    AuthUserService_1 = AuthUserService;
    AuthUserService.prototype.signUp = function (signUpCredentialsDto, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var session, userCreated, username, password, role, name_1, user, _a, _b, _c, event_2, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.connection.startSession()];
                    case 1:
                        session = _d.sent();
                        session.startTransaction();
                        userCreated = new user_created_entity_1.UserCreatedEntity();
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 8, 10, 11]);
                        username = signUpCredentialsDto.username, password = signUpCredentialsDto.password, role = signUpCredentialsDto.role, name_1 = signUpCredentialsDto.name;
                        user = this.usersService.newUserModel();
                        user.name = name_1;
                        user.username = username;
                        _a = user;
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 3:
                        _a.salt = _d.sent();
                        _b = user;
                        return [4 /*yield*/, this.hashPassword(password, user.salt)];
                    case 4:
                        _b.password = _d.sent();
                        user.oldPasswords[0] = user.password;
                        user.role = role;
                        if (!loggedUser) {
                            user.creationUserId = user._id;
                            user.modificationUserId = user._id;
                        }
                        else {
                            user.creationUserId = loggedUser._id;
                            user.modificationUserId = loggedUser._id;
                        }
                        _c = userCreated;
                        return [4 /*yield*/, user.save()];
                    case 5:
                        _c.user = _d.sent();
                        event_2 = new this.eventModel({
                            name: 'Sign-up',
                            type: 'User',
                            payload: { userId: userCreated.user._id }
                        });
                        return [4 /*yield*/, event_2.save()];
                    case 6:
                        _d.sent();
                        this.tokenService.createRefreshToken(userCreated.user._id);
                        userCreated.response = { message: const_app_1.ConstApp.USER_CREATED_OK, statusCode: 201 };
                        return [4 /*yield*/, session.commitTransaction()];
                    case 7:
                        _d.sent();
                        return [3 /*break*/, 11];
                    case 8:
                        error_1 = _d.sent();
                        return [4 /*yield*/, session.abortTransaction()];
                    case 9:
                        _d.sent();
                        this.logger.error(error_1);
                        if (error_1.code === 11000) {
                            throw new common_1.ConflictException(const_app_1.ConstApp.USERNAME_EXISTS_ERROR);
                        }
                        else {
                            throw new common_1.InternalServerErrorException();
                        }
                        return [3 /*break*/, 11];
                    case 10:
                        session.endSession();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/, userCreated];
                }
            });
        });
    };
    AuthUserService.prototype.updateUser = function (id, userChanged, loggedUser) {
        return __awaiter(this, void 0, void 0, function () {
            var username, name, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = userChanged.username, name = userChanged.name;
                        return [4 /*yield*/, this.usersService.get(id)];
                    case 1:
                        user = _a.sent();
                        user.name = name;
                        user.username = username;
                        user.modificationUserId = loggedUser._id;
                        //TODO cambio de password aca sin revision solo hay q revisar q exista una password nueva
                        return [4 /*yield*/, user.save()];
                    case 2:
                        //TODO cambio de password aca sin revision solo hay q revisar q exista una password nueva
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthUserService.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.get(id)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, user["delete"]()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthUserService.prototype.validateUserPassword = function (signInCredentialsDto) {
        return __awaiter(this, void 0, void 0, function () {
            var username, password, user, responsePayload, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        username = signInCredentialsDto.username, password = signInCredentialsDto.password;
                        return [4 /*yield*/, this.usersService.getSingleFilteredComplete('username', username)];
                    case 1:
                        user = _b.sent();
                        responsePayload = new response_payload_dto_1.ResponsePayload();
                        _a = user;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, user.validatePassword(password)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            responsePayload.userId = user._id;
                            responsePayload.role = user.role;
                            return [2 /*return*/, responsePayload];
                        }
                        else {
                            throw new common_1.UnauthorizedException(const_app_1.ConstApp.INVALID_CREDENTIALS_ERROR);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthUserService.prototype.getUser = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.get(_id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthUserService.prototype.getForValidation = function (id, role) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.getForValidation(id, role)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthUserService.prototype.hashPassword = function (password, salt) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, bcrypt.hash(password, salt)];
            });
        });
    };
    AuthUserService.prototype.getUserByUsernameRole = function (username, role) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.getUserByUsernameRole(username, role)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthUserService.prototype.getUserByIdComplete = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.getUserByUsernameAndSalt(_id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthUserService.prototype.validateOldPassword = function (user, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user.validateOldPassword(password)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    var AuthUserService_1;
    AuthUserService = AuthUserService_1 = __decorate([
        common_1.Injectable(),
        __param(2, mongoose_1.InjectConnection(const_app_1.ConstApp.USER)),
        __param(3, mongoose_1.InjectModel(event_1.Event.name))
    ], AuthUserService);
    return AuthUserService;
}());
exports.AuthUserService = AuthUserService;
