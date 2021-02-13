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
exports.__esModule = true;
exports.ChatController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var roles_decorator_1 = require("@common/decorators/roles.decorator");
var passport_1 = require("@nestjs/passport");
var const_app_1 = require("@utils/const.app");
var auth_user_decorator_1 = require("@common/decorators/auth.user.decorator");
var role_1 = require("@database/datamodels/enums/role");
var roles_guard_1 = require("@auth/guards/roles.guard");
var message_dto_1 = require("@chat/dtos/message.dto");
var ChatController = /** @class */ (function () {
    function ChatController(chatService) {
        this.chatService = chatService;
    }
    ChatController.prototype.getAll = function (loggedUser) {
        return this.chatService.getAll(loggedUser);
    };
    ChatController.prototype.getAllUnreadMessages = function (loggedUser) {
        return this.chatService.getAllUnreadMessages(loggedUser);
    };
    ChatController.prototype.create = function (dto, loggedUser) {
        return this.chatService.create(dto, loggedUser);
    };
    ChatController.prototype.readMessages = function (dto, loggedUser) {
        return this.chatService.readMessages(dto, loggedUser);
    };
    __decorate([
        common_1.Get(),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: message_dto_1.MessageDto
        }),
        roles_decorator_1.Roles(role_1.Role.consortium, role_1.Role.banker),
        __param(0, auth_user_decorator_1.AuthUser())
    ], ChatController.prototype, "getAll");
    __decorate([
        common_1.Get('unread'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: message_dto_1.MessageDto
        }),
        roles_decorator_1.Roles(role_1.Role.consortium, role_1.Role.banker),
        __param(0, auth_user_decorator_1.AuthUser())
    ], ChatController.prototype, "getAllUnreadMessages");
    __decorate([
        common_1.Post(),
        swagger_1.ApiCreatedResponse({
            description: const_app_1.ConstApp.DEFAULT_POST_OK,
            type: message_dto_1.MessageDto
        }),
        roles_decorator_1.Roles(role_1.Role.consortium, role_1.Role.banker),
        __param(0, common_1.Body()), __param(1, auth_user_decorator_1.AuthUser())
    ], ChatController.prototype, "create");
    __decorate([
        common_1.Post('read'),
        swagger_1.ApiCreatedResponse({
            description: const_app_1.ConstApp.DEFAULT_POST_OK,
            type: Boolean
        }),
        roles_decorator_1.Roles(role_1.Role.consortium, role_1.Role.banker),
        __param(0, common_1.Body()), __param(1, auth_user_decorator_1.AuthUser())
    ], ChatController.prototype, "readMessages");
    ChatController = __decorate([
        swagger_1.ApiTags('messages'),
        common_1.Controller('messages'),
        common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard)
    ], ChatController);
    return ChatController;
}());
exports.ChatController = ChatController;
