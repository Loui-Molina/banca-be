import { ApiProperty } from '@nestjs/swagger';
import { DashboardDiagramNodeDto } from '@src/modules/dashboard/dtos/dashboard.node.dto';
import { DashboardDiagramLinkDto } from '@src/modules/dashboard/dtos/dashboard.link.dto';
import { DashboardDiagramClusterDto } from '@src/modules/dashboard/dtos/dashboard.cluster.dto';

export class DashboardWidgetsDto {
    @ApiProperty() ticketsSold: number;
    @ApiProperty() profits: number;
    @ApiProperty() losses: number;
    @ApiProperty() balance: number;
}
