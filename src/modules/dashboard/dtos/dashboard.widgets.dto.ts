import { ApiProperty } from '@nestjs/swagger';

export class DashboardWidgetsDto {
    @ApiProperty() ticketsSold: number;
    @ApiProperty() profits: number;
    @ApiProperty() awards: number;
    @ApiProperty() balance: number;
}
