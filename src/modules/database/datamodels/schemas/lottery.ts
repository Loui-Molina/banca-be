import {DataObject} from '@database/datamodels/schemas/data.object';
import {LotteryTime, LotteryTimeSchema} from '@database/datamodels/schemas/lottery.time';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, ObjectId} from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";
import {Result, ResultSchema} from "@database/datamodels/schemas/result";
import { Draw } from '@database/datamodels/schemas/draw';

export type LotteryDocument = Lottery & Document;

@Schema()
export class Lottery implements DataObject {
    @ApiProperty() _id?: ObjectId;
    @ApiProperty() @Prop({ required: true }) name: string;
    @ApiProperty() @Prop({ required: true }) nickname: string;
    @ApiProperty() @Prop({ required: true }) color: string;
    @ApiProperty() @Prop() logo?: string;
    @ApiProperty() @Prop() status: boolean;
    @ApiProperty() @Prop({ type: LotteryTimeSchema }) time: LotteryTime;
    @ApiProperty() @Prop() lastDraw?: Draw;
    @ApiProperty() @Prop({ type: [ResultSchema] }) results?: Result[];

    // Data object members
    @ApiProperty() @Prop({ required: true, immutable: true }) creationUserId: string;
    @ApiProperty() @Prop() deletionDate?: Date;
    @ApiProperty() @Prop({ required: true }) modificationUserId: string;
}

export const LotterySchema = SchemaFactory.createForClass(Lottery).set('timestamps', true);
