import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import {Days} from "@database/datamodels/enums/Days";

export class LotteryDto {
    @ApiProperty({required:false}) _id?: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() nickname: string;
    @ApiProperty() color: string;
    @ApiProperty() status: boolean;
    @ApiProperty({required:false}) openTime?: string;
    @ApiProperty({required:false}) closeTime?: string;
    @ApiProperty({type: Number, enum:Days, isArray:true}) day: Days[];
}
