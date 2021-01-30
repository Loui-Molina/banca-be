import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsNumber } from 'class-validator';

export class PlayedNumbersDto {
    @IsNumber()
    @ApiProperty()
    number: number;
    @IsNumber()
    @ApiProperty()
    amount: number;
}
