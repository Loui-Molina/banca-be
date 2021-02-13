"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var health_check_module_1 = require("@health-check/health.check.module");
var auth_module_1 = require("@auth/auth.module");
var config_1 = require("@nestjs/config");
var utils_module_1 = require("@utils/utils.module");
var core_module_1 = require("@manager/core.module");
var database_module_1 = require("@database/database.module");
var common_module_1 = require("@common.module/common.module");
var schedule_1 = require("@nestjs/schedule");
var tasks_service_1 = require("@src/modules/services/tasks.service");
var mongoose_1 = require("@nestjs/mongoose");
var const_app_1 = require("@utils/const.app");
var playPool_1 = require("@database/datamodels/schemas/playPool");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: ['.env']
                }),
                database_module_1.DatabaseModule,
                auth_module_1.AuthModule,
                core_module_1.CoreModule,
                health_check_module_1.HealthCheckModule,
                schedule_1.ScheduleModule.forRoot(),
                utils_module_1.UtilsModule,
                common_module_1.CommonModule,
                mongoose_1.MongooseModule.forFeature([{ name: playPool_1.PlayPool.name, schema: playPool_1.PlayPoolSchema }], const_app_1.ConstApp.BANKING),
            ],
            controllers: [],
            providers: [tasks_service_1.TasksService],
            exports: [core_module_1.CoreModule, utils_module_1.UtilsModule, auth_module_1.AuthModule, database_module_1.DatabaseModule]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
