import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { DashboardDiagramClusterDto } from './dashboard.cluster.dto';
import { DashboardDiagramLinkDto } from './dashboard.link.dto';
import { DashboardDiagramNodeDto } from './dashboard.node.dto';

export class DashboardDiagramDto {
    @ApiProperty({ type: DashboardDiagramNodeDto, isArray: true })
    @IsArray()
    nodes: DashboardDiagramNodeDto[] = [];
    @ApiProperty({ type: DashboardDiagramLinkDto, isArray: true })
    @IsArray()
    links: DashboardDiagramLinkDto[] = [];
    @ApiProperty({
        type: DashboardDiagramClusterDto,
        isArray: true,
    })
    @IsArray()
    clusters: DashboardDiagramClusterDto[] = [];
}
