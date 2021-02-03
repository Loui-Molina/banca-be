import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { DashboardGraphBalanceBankingDto } from '@dashboard/dtos/dashboard.graph.balance.banking.dto';

export class DashboardGraphConsortiumBalanceBankingDto {
    @ApiProperty() @IsString() name: string;
    @ApiProperty() @IsArray() series: DashboardGraphBalanceBankingDto[];
}
