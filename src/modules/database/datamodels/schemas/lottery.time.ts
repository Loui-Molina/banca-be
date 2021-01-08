import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Days } from '@src/modules/database/datamodels/enums/days';

export type LotteryTimeDocument = LotteryTime & Document;
@Schema({ timestamps: true, optimisticConcurrency: true,useNestedStrict: true, strict: true })
export class LotteryTime {
    @ApiProperty() @Prop({ type: [String], enum: [Days] }) day: Days[];
    @ApiProperty() @Prop({ required: true }) openTime?: string;
    @ApiProperty() @Prop({ required: true }) closeTime?: string;
}

export const LotteryTimeSchema = SchemaFactory.createForClass(LotteryTime);
