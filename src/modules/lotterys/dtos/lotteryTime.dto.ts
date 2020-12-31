import { ApiProperty } from '@nestjs/swagger';
import {Days} from "@database/datamodels/enums/Days";

export class LotteryTimeDto {
    @ApiProperty() openTime: string;
    @ApiProperty() closeTime: string;
    @ApiProperty({type: Number, enum:Days, isArray:true}) day: Days[];
}
