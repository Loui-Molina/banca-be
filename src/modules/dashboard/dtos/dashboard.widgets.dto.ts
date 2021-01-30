import { ApiProperty } from '@nestjs/swagger';

export class DashboardWidgetsDto {
    @ApiProperty() ticketsSold: number;
    @ApiProperty() profits: number;
    @ApiProperty() prizes: number;
    @ApiProperty() balance: number;
}
