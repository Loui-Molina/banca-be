import { ApiProperty } from '@nestjs/swagger';
import {ObjectId} from "mongoose";

export class AddResultDto {
    @ApiProperty({required:true}) lotteryId: ObjectId;
    @ApiProperty({required:true}) first: number;
    @ApiProperty({required:true}) second: number;
    @ApiProperty({required:true}) third: number;
}
