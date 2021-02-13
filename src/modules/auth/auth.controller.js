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
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var response_dto_1 = require("@utils/dtos/response.dto");
var passport_1 = require("@nestjs/passport");
var swagger_1 = require("@nestjs/swagger");
var const_app_1 = require("@utils/const.app");
var user_1 = require("@database/datamodels/schemas/user");
var auth_user_decorator_1 = require("@common/decorators/auth.user.decorator");
var response_sign_in_dto_1 = require("@auth/dtos/response.sign.in.dto");
var auth_refresh_token_decorator_1 = require("@common/decorators/auth.refresh.token.decorator");
var AuthController = /** @class */ (function () {
    function AuthController(authService, tokenService) {
        this.authService = authService;
        this.tokenService = tokenService;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    AuthController_1 = AuthController;
    //THIS METHOD SHOULDNT BE IN PROD
    //WARNING
    AuthController.prototype.singUp = function (signUpCredentialsDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.authService.signUp(signUpCredentialsDto, null)];
            });
        });
    };
    AuthController.prototype.singUpLogged = function (user, signUpCredentialsDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.authService.signUp(signUpCredentialsDto, user)];
            });
        });
    };
    AuthController.prototype.singIn = function (userIp, signInCredentialsDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.logger.debug('UserIp ' + userIp);
                return [2 /*return*/, this.authService.signIn(userIp, signInCredentialsDto)];
            });
        });
    };
    AuthController.prototype.getLoggedUser = function (user) {
        return this.authService.getLoggedUser(user);
    };
    AuthController.prototype.getToken = function (ipAdress, refreshToken) {
        return this.tokenService.getRefreshToken(ipAdress, refreshToken, true);
    };
    AuthController.prototype.logOut = function (ipAdress, user) {
        return this.authService.logOut(ipAdress, user);
    };
    var AuthController_1;
    __decorate([
        common_1.Post('/sign-up'),
        common_1.HttpCode(common_1.HttpStatus.CREATED),
        swagger_1.ApiOkResponse({ type: response_dto_1.ResponseDto, description: 'Successfully Registered' }),
        swagger_1.ApiCreatedResponse({
            description: 'The record has been successfully saved.',
            type: response_dto_1.ResponseDto
        }),
        __param(0, common_1.Body(common_1.ValidationPipe))
    ], AuthController.prototype, "singUp");
    __decorate([
        common_1.Post('/sign-up-logged'),
        common_1.UseGuards(passport_1.AuthGuard()),
        common_1.HttpCode(common_1.HttpStatus.CREATED),
        swagger_1.ApiOkResponse({ type: response_dto_1.ResponseDto, description: 'Successfully Registered' }),
        swagger_1.ApiCreatedResponse({
            description: 'The record has been successfully saved.',
            type: response_dto_1.ResponseDto
        }),
        __param(0, auth_user_decorator_1.AuthUser()),
        __param(1, common_1.Body())
    ], AuthController.prototype, "singUpLogged");
    __decorate([
        common_1.Post('/sign-in'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: response_sign_in_dto_1.ResponseSignInDto
        }),
        __param(0, common_1.Ip()), __param(1, common_1.Body())
    ], AuthController.prototype, "singIn");
    __decorate([
        common_1.Get('/logged-user'),
        common_1.UseGuards(passport_1.AuthGuard()),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: user_1.User
        }),
        __param(0, auth_user_decorator_1.AuthUser())
    ], AuthController.prototype, "getLoggedUser");
    __decorate([
        common_1.Get('/refresh-token'),
        common_1.UseGuards(passport_1.AuthGuard('refresh')),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: String
        }),
        __param(0, common_1.Ip()), __param(1, auth_refresh_token_decorator_1.AuthRefreshToken())
    ], AuthController.prototype, "getToken");
    __decorate([
        common_1.Get('/log-out'),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, common_1.Ip()), __param(1, auth_user_decorator_1.AuthUser())
    ], AuthController.prototype, "logOut");
    AuthController = AuthController_1 = __decorate([
        swagger_1.ApiTags('auth'),
        common_1.Controller('auth')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
