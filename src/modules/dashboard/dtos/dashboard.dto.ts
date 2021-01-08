import { ApiProperty } from '@nestjs/swagger';
import { DashboardDiagramNodeDto } from '@src/modules/dashboard/dtos/dashboard.node.dto';
import { DashboardDiagramLinkDto } from '@src/modules/dashboard/dtos/dashboard.link.dto';
import { DashboardDiagramClusterDto } from '@src/modules/dashboard/dtos/dashboard.cluster.dto';

export class DashboardDiagramDto {
    @ApiProperty({type:DashboardDiagramNodeDto, isArray: true}) nodes: DashboardDiagramNodeDto[] = [];
    @ApiProperty({type:DashboardDiagramLinkDto, isArray: true}) links: DashboardDiagramLinkDto[] = [];
    @ApiProperty({type:DashboardDiagramClusterDto, isArray: true}) clusters: DashboardDiagramClusterDto[] = [];
}
