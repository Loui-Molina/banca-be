import { ApiProperty } from '@nestjs/swagger';
import {DashboardDiagramNodeDto} from "@src/modules/dashboard/dtos/dashboardDiagramNode.dto";
import {DashboardDiagramLinkDto} from "@src/modules/dashboard/dtos/dashboardDiagramLink.dto";
import {DashboardDiagramClusterDto} from "@src/modules/dashboard/dtos/dashboardDiagramCluster.dto";
``
export class DashboardDiagramDto {
    @ApiProperty() nodes: DashboardDiagramNodeDto[] = [];
    @ApiProperty() links: DashboardDiagramLinkDto[] = [];
    @ApiProperty() clusters: DashboardDiagramClusterDto[] = [];
}
