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
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
var user_1 = require("@database/datamodels/schemas/user");
var swagger_1 = require("@nestjs/swagger");
var passport_1 = require("@nestjs/passport");
var roles_decorator_1 = require("@common/decorators/roles.decorator");
var role_1 = require("@database/datamodels/enums/role");
var roles_guard_1 = require("@auth/guards/roles.guard");
var const_app_1 = require("@utils/const.app");
var auth_user_decorator_1 = require("@common/decorators/auth.user.decorator");
var mongoose = require("mongoose");
var response_dto_1 = require("@utils/dtos/response.dto");
var UsersController = /** @class */ (function () {
    function UsersController(userService) {
        this.userService = userService;
    }
    UsersController.prototype.getAll = function (paginationQueryDto) {
        var limit = paginationQueryDto.limit, offset = paginationQueryDto.offset;
        return this.userService.getAll(limit, offset);
    };
    UsersController.prototype.getFiltered = function (q, value) {
        return this.userService.find(q, value);
    };
    UsersController.prototype.update = function (userIp, dto, loggedUser) {
        var user = this.userService.update(dto, loggedUser, userIp);
        var responseDto = new response_dto_1.ResponseDto();
        if (!user) {
            responseDto.statusCode = common_1.HttpStatus.BAD_REQUEST;
            responseDto.message = const_app_1.ConstApp.UNABLE_TO_UPDATE_USER;
        }
        responseDto.statusCode = common_1.HttpStatus.OK;
        responseDto.message = const_app_1.ConstApp.USER_UPDATED;
        return responseDto;
    };
    UsersController.prototype["delete"] = function (id) {
        return this.userService["delete"](new mongoose.Schema.Types.ObjectId(id));
    };
    UsersController.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.get(new mongoose.Schema.Types.ObjectId(id))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        common_1.Get(),
        roles_decorator_1.Roles(role_1.Role.admin),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: user_1.User
        }),
        __param(0, common_1.Query())
    ], UsersController.prototype, "getAll");
    __decorate([
        common_1.Get('search'),
        roles_decorator_1.Roles(role_1.Role.admin),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: user_1.User
        }),
        __param(0, common_1.Query('q')), __param(1, common_1.Query('value'))
    ], UsersController.prototype, "getFiltered");
    __decorate([
        common_1.Put(),
        roles_decorator_1.Roles(role_1.Role.admin, role_1.Role.consortium),
        swagger_1.ApiCreatedResponse({
            description: const_app_1.ConstApp.DEFAULT_PUT_OK,
            type: user_1.User
        }),
        __param(0, common_1.Ip()), __param(1, common_1.Body()), __param(2, auth_user_decorator_1.AuthUser())
    ], UsersController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        roles_decorator_1.Roles(role_1.Role.admin),
        swagger_1.ApiOkResponse({
            description: const_app_1.ConstApp.DEFAULT_DELETE_OK,
            type: user_1.User
        }),
        __param(0, common_1.Param('id'))
    ], UsersController.prototype, "delete");
    __decorate([
        common_1.Get(':id'),
        roles_decorator_1.Roles(role_1.Role.admin),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: user_1.User
        }),
        __param(0, common_1.Param('id'))
    ], UsersController.prototype, "get");
    UsersController = __decorate([
        swagger_1.ApiTags('users'),
        common_1.Controller('users'),
        common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard)
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
