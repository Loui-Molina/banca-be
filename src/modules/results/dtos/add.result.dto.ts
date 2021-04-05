import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddResultDto {
    @ApiProperty({ required: true }) @IsString() lotteryId: string;
    @ApiProperty({ required: true }) @IsString() date: string;
    @ApiProperty({ required: true }) @IsNumber() first: number;
    @ApiProperty({ required: true }) @IsNumber() second: number;
    @ApiProperty({ required: true }) @IsNumber() third: number;
}
