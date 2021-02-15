import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { PlayedNumbersDto } from './played.numbers.dto';

export class DashboardPlayedNumbersDto {
    @ApiProperty({ type: PlayedNumbersDto, isArray: true }) numbers: PlayedNumbersDto[];
}
