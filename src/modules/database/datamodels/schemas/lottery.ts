import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { DataObject } from './data.object';
import { Draw } from './draw';
import { LotteryTimeSchema, LotteryTime } from './lottery.time';
import { ResultSchema, Result } from './result';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class Lottery extends Document implements DataObject {
    @Prop({ required: true }) name: string;
    @Prop({ required: true }) nickname: string;
    @Prop({ required: true }) color: string;
    @Prop() logo?: string;
    @Prop() status: boolean;
    @Prop({ type: LotteryTimeSchema }) time: LotteryTime;
    @Prop({ required: true }) playTime?: string;
    @Prop() lastDraw?: Draw;
    @Prop({ type: [ResultSchema] }) results?: Result[];

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId }) creationUserId: ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;
}

export const LotterySchema = SchemaFactory.createForClass(Lottery);
