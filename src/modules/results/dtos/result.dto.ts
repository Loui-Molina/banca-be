import { ApiProperty } from '@nestjs/swagger';
import {Draw, DrawSchema} from "@database/datamodels/schemas/draw";
import {ObjectId} from "mongoose";

export class ResultDto {
    @ApiProperty() _id: ObjectId;
    @ApiProperty() lotteryId: ObjectId;
    @ApiProperty() lotteryName: string;
    @ApiProperty() date?: Date;
    @ApiProperty() createdAt?: Date;
    @ApiProperty() draw?: Draw;
}
