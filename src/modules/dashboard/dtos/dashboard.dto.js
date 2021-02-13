"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardDiagramDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var dashboard_node_dto_1 = require("@dashboard/dtos/dashboard.node.dto");
var dashboard_link_dto_1 = require("@dashboard/dtos/dashboard.link.dto");
var dashboard_cluster_dto_1 = require("@dashboard/dtos/dashboard.cluster.dto");
var class_validator_1 = require("class-validator");
var DashboardDiagramDto = /** @class */ (function () {
    function DashboardDiagramDto() {
        this.nodes = [];
        this.links = [];
        this.clusters = [];
    }
    __decorate([
        swagger_1.ApiProperty({ type: dashboard_node_dto_1.DashboardDiagramNodeDto, isArray: true }),
        class_validator_1.IsArray()
    ], DashboardDiagramDto.prototype, "nodes");
    __decorate([
        swagger_1.ApiProperty({ type: dashboard_link_dto_1.DashboardDiagramLinkDto, isArray: true }),
        class_validator_1.IsArray()
    ], DashboardDiagramDto.prototype, "links");
    __decorate([
        swagger_1.ApiProperty({
            type: dashboard_cluster_dto_1.DashboardDiagramClusterDto,
            isArray: true
        }),
        class_validator_1.IsArray()
    ], DashboardDiagramDto.prototype, "clusters");
    return DashboardDiagramDto;
}());
exports.DashboardDiagramDto = DashboardDiagramDto;
