"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var user_1 = require("@database/datamodels/schemas/user");
var const_app_1 = require("@utils/const.app");
var users_service_1 = require("@users/users.service");
var users_controller_1 = require("@users/users.controller");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        common_1.Module({
            imports: [mongoose_1.MongooseModule.forFeature([{ name: user_1.User.name, schema: user_1.UserSchema }], const_app_1.ConstApp.USER)],
            providers: [users_service_1.UsersService],
            controllers: [users_controller_1.UsersController],
            exports: [users_service_1.UsersService]
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
