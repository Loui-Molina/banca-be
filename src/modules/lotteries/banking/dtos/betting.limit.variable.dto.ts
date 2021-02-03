import { ApiProperty } from '@nestjs/swagger';
import {Prop} from "@nestjs/mongoose";

export class BettingLimitVariableDto {
    @ApiProperty({ required: false }) @Prop({ required: true }) betAmount?: number;
    @ApiProperty({ required: false }) @Prop({ required: true }) number?: number;
}
