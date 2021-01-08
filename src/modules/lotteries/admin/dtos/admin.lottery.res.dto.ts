import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Days } from '@database/datamodels/enums/days';
import { Result } from '@database/datamodels/schemas/result';
import { Lottery } from '@database/datamodels/schemas/lottery';

export class AdminLotteryResDto extends PartialType(Lottery) {
    @ApiProperty({ required: false }) _id?: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() nickname: string;
    @ApiProperty() color: string;
    @ApiProperty() playTime: string;
    @ApiProperty() status: boolean;
    @ApiProperty({ type: Result, isArray: true }) results?: Result[];
    @ApiProperty({ required: false }) openTime?: string;
    @ApiProperty({ required: false }) closeTime?: string;
    @ApiProperty({ type: Number, enum: Days, isArray: true }) day: Days[];
}
