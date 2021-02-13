"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var auth_controller_1 = require("@auth/auth.controller");
var auth_service_1 = require("@auth/auth.service");
var jwt_1 = require("@nestjs/jwt");
var passport_1 = require("@nestjs/passport");
var config_1 = require("@nestjs/config");
var jwt_strategy_1 = require("@auth/jwt.strategy");
var auth_user_module_1 = require("@auth.user/auth.user.module");
var token_service_1 = require("@auth/token.service");
var refresh_strategy_1 = require("@auth/refresh.strategy");
var mongoose_1 = require("@nestjs/mongoose");
var banking_1 = require("@database/datamodels/schemas/banking");
var const_app_1 = require("@utils/const.app");
var consortium_1 = require("@database/datamodels/schemas/consortium");
var users_admin_initialize_service_1 = require("@auth/users.admin.initialize.service");
var web_user_1 = require("@database/datamodels/schemas/web.user");
var auth_password_controller_1 = require("@auth/auth.password.controller");
var auth_password_service_1 = require("@auth/auth.password.service");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        common_1.Global(),
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: banking_1.Banking.name, schema: banking_1.BankingSchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: consortium_1.Consortium.name, schema: consortium_1.ConsortiumSchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: web_user_1.WebUser.name, schema: web_user_1.WebUserSchema }], const_app_1.ConstApp.BANKING),
                jwt_1.JwtModule.registerAsync({
                    useFactory: function (configService) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, {
                                    secret: configService.get('TOKEN_SECRET_KEY'),
                                    signOptions: {
                                        expiresIn: configService.get('TOKEN_EXPIRES')
                                    }
                                }];
                        });
                    }); },
                    inject: [config_1.ConfigService]
                }),
                passport_1.PassportModule.register({
                    defaultStrategy: 'jwt'
                }),
                auth_user_module_1.AuthUserModule,
            ],
            providers: [
                auth_service_1.AuthService,
                auth_password_service_1.AuthPasswordService,
                users_admin_initialize_service_1.UsersAdminInitializeService,
                jwt_strategy_1.JwtStrategy,
                token_service_1.TokenService,
                refresh_strategy_1.RefreshStrategy,
            ],
            controllers: [auth_controller_1.AuthController, auth_password_controller_1.AuthPasswordController],
            exports: [
                jwt_1.JwtModule,
                passport_1.PassportModule.register({
                    defaultStrategy: 'jwt'
                }),
                jwt_strategy_1.JwtStrategy,
                refresh_strategy_1.RefreshStrategy,
                token_service_1.TokenService,
                auth_user_module_1.AuthUserModule,
            ]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
