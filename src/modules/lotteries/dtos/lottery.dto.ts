import {ApiProperty} from '@nestjs/swagger';
import {ObjectId} from 'mongoose';
import {Days} from "@src/modules/database/datamodels/enums/days";
import {Prop} from "@nestjs/mongoose";
import {Result, ResultSchema} from "@database/datamodels/schemas/result";

export class LotteryDto {
    @ApiProperty({ required: false }) _id?: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() nickname: string;
    @ApiProperty() color: string;
    @ApiProperty() status: boolean;
    @ApiProperty() @Prop({ type: [ResultSchema] }) results?: Result[];
    @ApiProperty({required:false}) openTime?: string;
    @ApiProperty({required:false}) closeTime?: string;
    @ApiProperty({type: Number, enum:Days, isArray:true}) day: Days[];
}
