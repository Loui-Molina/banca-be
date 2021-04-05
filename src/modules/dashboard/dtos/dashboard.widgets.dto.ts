import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DashboardWidgetsDto {
    @ApiProperty() @IsNumber() ticketsSold: number;
    @ApiProperty() @IsNumber() profits: number;
    @ApiProperty() @IsNumber() prizes: number;
    @ApiProperty() @IsNumber() balance: number;
}
