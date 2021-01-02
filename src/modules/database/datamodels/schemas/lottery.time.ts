import { Days } from '@src/modules/database/datamodels/enums/days';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

export type LotteryTimeDocument = LotteryTime & Document;
@Schema()
export class LotteryTime {
    @ApiProperty() @Prop({ type: [String], enum: [Days] }) day: Days[];
    @ApiProperty() @Prop({ required: true }) openTime?: string;
    @ApiProperty() @Prop({ required: true }) closeTime?: string;
}

export const LotteryTimeSchema = SchemaFactory.createForClass(LotteryTime).set('timestamps', true);
