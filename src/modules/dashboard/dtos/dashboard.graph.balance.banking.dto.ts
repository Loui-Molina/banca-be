import { ApiProperty } from '@nestjs/swagger';

export class DashboardGraphBalanceBankingDto {
    @ApiProperty() name: string;
    @ApiProperty() value: number;
}
