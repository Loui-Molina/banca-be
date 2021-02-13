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
exports.BettingPanelController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var passport_1 = require("@nestjs/passport");
var const_app_1 = require("@utils/const.app");
var role_1 = require("@database/datamodels/enums/role");
var roles_guard_1 = require("@auth/guards/roles.guard");
var bet_dto_1 = require("@betting.panel/dtos/bet.dto");
var roles_decorator_1 = require("@common/decorators/roles.decorator");
var auth_user_decorator_1 = require("@common/decorators/auth.user.decorator");
var resume_sells_dto_1 = require("@betting.panel/dtos/resume.sells.dto");
var BettingPanelController = /** @class */ (function () {
    function BettingPanelController(bettingPanelService) {
        this.bettingPanelService = bettingPanelService;
    }
    BettingPanelController.prototype.getAll = function (loggedUser) {
        return this.bettingPanelService.getAll(loggedUser);
    };
    BettingPanelController.prototype.getResumeSells = function (loggedUser) {
        return this.bettingPanelService.getResumeSells(loggedUser);
    };
    BettingPanelController.prototype.getFiltered = function (q, value) {
        return this.bettingPanelService.getFiltered(q, value);
    };
    BettingPanelController.prototype.create = function (dto, loggedUser) {
        return this.bettingPanelService.create(dto, loggedUser);
    };
    BettingPanelController.prototype.verifyLimit = function (dto, loggedUser) {
        return this.bettingPanelService.verifyLimit(dto, loggedUser);
    };
    BettingPanelController.prototype.cancelBet = function (dto, loggedUser) {
        return this.bettingPanelService.cancelBet(dto, loggedUser);
    };
    BettingPanelController.prototype.getClaimTicket = function (dto, loggedUser) {
        return this.bettingPanelService.getClaimTicket(dto, loggedUser);
    };
    BettingPanelController.prototype.claimTicket = function (dto, loggedUser) {
        return this.bettingPanelService.claimTicket(dto, loggedUser);
    };
    BettingPanelController.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bettingPanelService.get(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        common_1.Get(),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: bet_dto_1.BetDto
        }),
        roles_decorator_1.Roles(role_1.Role.banker),
        __param(0, auth_user_decorator_1.AuthUser())
    ], BettingPanelController.prototype, "getAll");
    __decorate([
        common_1.Get('resume/sells'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: resume_sells_dto_1.ResumeSellsDto
        }),
        roles_decorator_1.Roles(role_1.Role.banker),
        __param(0, auth_user_decorator_1.AuthUser())
    ], BettingPanelController.prototype, "getResumeSells");
    __decorate([
        common_1.Get('search'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: bet_dto_1.BetDto
        }),
        roles_decorator_1.Roles(role_1.Role.banker),
        __param(0, common_1.Query('q')), __param(1, common_1.Query('value'))
    ], BettingPanelController.prototype, "getFiltered");
    __decorate([
        common_1.Post(),
        swagger_1.ApiCreatedResponse({
            description: const_app_1.ConstApp.DEFAULT_POST_OK,
            type: bet_dto_1.BetDto
        }),
        roles_decorator_1.Roles(role_1.Role.banker),
        __param(0, common_1.Body()), __param(1, auth_user_decorator_1.AuthUser())
    ], BettingPanelController.prototype, "create");
    __decorate([
        common_1.Post('verify-limit'),
        swagger_1.ApiCreatedResponse({
            description: const_app_1.ConstApp.DEFAULT_POST_OK,
            type: Number
        }),
        roles_decorator_1.Roles(role_1.Role.banker),
        __param(0, common_1.Body()), __param(1, auth_user_decorator_1.AuthUser())
    ], BettingPanelController.prototype, "verifyLimit");
    __decorate([
        common_1.Put('cancel'),
        swagger_1.ApiCreatedResponse({
            description: const_app_1.ConstApp.DEFAULT_PUT_OK,
            type: bet_dto_1.BetDto
        }),
        roles_decorator_1.Roles(role_1.Role.banker),
        __param(0, common_1.Body()), __param(1, auth_user_decorator_1.AuthUser())
    ], BettingPanelController.prototype, "cancelBet");
    __decorate([
        common_1.Put('search/ticket'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_PUT_OK,
            type: bet_dto_1.BetDto
        }),
        roles_decorator_1.Roles(role_1.Role.banker),
        __param(0, common_1.Body()), __param(1, auth_user_decorator_1.AuthUser())
    ], BettingPanelController.prototype, "getClaimTicket");
    __decorate([
        common_1.Put('claim'),
        swagger_1.ApiCreatedResponse({
            description: const_app_1.ConstApp.DEFAULT_PUT_OK,
            type: bet_dto_1.BetDto
        }),
        roles_decorator_1.Roles(role_1.Role.banker),
        __param(0, common_1.Body()), __param(1, auth_user_decorator_1.AuthUser())
    ], BettingPanelController.prototype, "claimTicket");
    __decorate([
        common_1.Get(':id'),
        swagger_1.ApiFoundResponse({
            description: const_app_1.ConstApp.DEFAULT_GET_OK,
            type: bet_dto_1.BetDto
        }),
        roles_decorator_1.Roles(role_1.Role.banker),
        __param(0, common_1.Param('id'))
    ], BettingPanelController.prototype, "get");
    BettingPanelController = __decorate([
        swagger_1.ApiTags('betting-panel'),
        common_1.Controller('betting-panel'),
        common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard)
    ], BettingPanelController);
    return BettingPanelController;
}());
exports.BettingPanelController = BettingPanelController;
