import { ApiProperty } from '@nestjs/swagger';

export class AddResultDto {
    @ApiProperty({required:true}) lotteryId: string;
    @ApiProperty({required:true}) date: string;
    @ApiProperty({required:true}) first: number;
    @ApiProperty({required:true}) second: number;
    @ApiProperty({required:true}) third: number;
}
