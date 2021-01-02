import { ApiProperty } from '@nestjs/swagger';
import {DashboardDiagramNodeDto} from "@src/modules/dashboard/dtos/dashboard.node.dto";
import {DashboardDiagramLinkDto} from "@src/modules/dashboard/dtos/dashboard.link.dto";
import {DashboardDiagramClusterDto} from "@src/modules/dashboard/dtos/dashboard.cluster.dto";

export class DashboardDiagramDto {
    @ApiProperty() nodes: DashboardDiagramNodeDto[] = [];
    @ApiProperty() links: DashboardDiagramLinkDto[] = [];
    @ApiProperty() clusters: DashboardDiagramClusterDto[] = [];
}
