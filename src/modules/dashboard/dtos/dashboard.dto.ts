import { ApiProperty } from '@nestjs/swagger';
import { DashboardDiagramNodeDto } from '@src/modules/dashboard/dtos/dashboard.node.dto';
import { DashboardDiagramLinkDto } from '@src/modules/dashboard/dtos/dashboard.link.dto';
import { DashboardDiagramClusterDto } from '@src/modules/dashboard/dtos/dashboard.cluster.dto';
import { IsArray } from 'class-validator';

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
