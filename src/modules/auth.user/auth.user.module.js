"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthUserModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var refresh_token_1 = require("@database/datamodels/schemas/refresh.token");
var auth_user_service_1 = require("@auth.user/auth.user.service");
var event_1 = require("@database/datamodels/schemas/event");
var users_module_1 = require("@users/users.module");
var const_app_1 = require("@utils/const.app");
var AuthUserModule = /** @class */ (function () {
    function AuthUserModule() {
    }
    AuthUserModule = __decorate([
        common_1.Module({
            imports: [
                users_module_1.UsersModule,
                mongoose_1.MongooseModule.forFeature([{ name: refresh_token_1.RefreshToken.name, schema: refresh_token_1.RefreshTokenSchema }], const_app_1.ConstApp.USER),
                mongoose_1.MongooseModule.forFeature([{ name: event_1.Event.name, schema: event_1.EventSchema }], const_app_1.ConstApp.USER),
            ],
            providers: [auth_user_service_1.AuthUserService],
            exports: [
                auth_user_service_1.AuthUserService,
                mongoose_1.MongooseModule.forFeature([{ name: refresh_token_1.RefreshToken.name, schema: refresh_token_1.RefreshTokenSchema }], const_app_1.ConstApp.USER),
                mongoose_1.MongooseModule.forFeature([{ name: event_1.Event.name, schema: event_1.EventSchema }], const_app_1.ConstApp.USER),
                users_module_1.UsersModule,
            ]
        })
    ], AuthUserModule);
    return AuthUserModule;
}());
exports.AuthUserModule = AuthUserModule;
