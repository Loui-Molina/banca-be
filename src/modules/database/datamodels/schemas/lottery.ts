import { DataObject } from '@database/datamodels/schemas/data.object';
import { LotteryTime, LotteryTimeSchema } from '@database/datamodels/schemas/lottery.time';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Result, ResultSchema } from '@database/datamodels/schemas/result';
import { Draw } from '@database/datamodels/schemas/draw';

export type LotteryDocument = Lottery & Document;

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class Lottery implements DataObject {
    @Prop({ required: true }) name: string;
    @Prop({ required: true }) nickname: string;
    @Prop({ required: true }) color: string;
    @Prop() logo?: string;
    @Prop() status: boolean;
    @Prop({ type: LotteryTimeSchema }) time: LotteryTime;
    @Prop({ required: true }) playTime?: string;
    @Prop() lastDraw?: Draw;
    @Prop({ type: [ResultSchema] }) results?: Result[];

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string;
}

export const LotterySchema = SchemaFactory.createForClass(Lottery);
