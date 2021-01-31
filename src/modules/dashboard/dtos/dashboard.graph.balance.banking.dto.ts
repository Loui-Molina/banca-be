import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DashboardGraphBalanceBankingDto {
    @ApiProperty() @IsString() name: string;
    @ApiProperty() @IsNumber() value: number;
}
