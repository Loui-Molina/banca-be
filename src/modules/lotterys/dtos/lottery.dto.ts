import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import {LotteryTimeDto} from "@src/modules/lotterys/dtos/lotteryTime.dto";

export class LotteryDto {
    @ApiProperty({required:false}) _id?: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() nickname: string;
    @ApiProperty() color: string;
    @ApiProperty() status: boolean;
    @ApiProperty({type: LotteryTimeDto}) time: LotteryTimeDto;
}
