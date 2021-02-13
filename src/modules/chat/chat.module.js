"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var const_app_1 = require("@utils/const.app");
var banking_1 = require("@database/datamodels/schemas/banking");
var consortium_1 = require("@database/datamodels/schemas/consortium");
var message_1 = require("@database/datamodels/schemas/message");
var chat_service_1 = require("@chat/chat.service");
var chat_controller_1 = require("@chat/chat.controller");
var ChatModule = /** @class */ (function () {
    function ChatModule() {
    }
    ChatModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: banking_1.Banking.name, schema: banking_1.BankingSchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: consortium_1.Consortium.name, schema: consortium_1.ConsortiumSchema }], const_app_1.ConstApp.BANKING),
                mongoose_1.MongooseModule.forFeature([{ name: message_1.Message.name, schema: message_1.MessageSchema }], const_app_1.ConstApp.BANKING),
            ],
            providers: [chat_service_1.ChatService],
            controllers: [chat_controller_1.ChatController],
            exports: [mongoose_1.MongooseModule]
        })
    ], ChatModule);
    return ChatModule;
}());
exports.ChatModule = ChatModule;
