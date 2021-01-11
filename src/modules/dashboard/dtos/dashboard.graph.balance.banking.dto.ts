import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class DashboardGraphBalanceBankingDto {
    @ApiProperty() name: string;
    @ApiProperty() value: number;
}
