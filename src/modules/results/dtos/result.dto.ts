import { ApiProperty } from '@nestjs/swagger';
import {Lottery} from "@database/datamodels/schemas/lottery";
import {Draw, DrawSchema} from "@database/datamodels/schemas/draw";

export class ResultDto {
    @ApiProperty() lottery: Lottery;
    @ApiProperty() date?: Date;
    @ApiProperty() draw?: Draw;
}