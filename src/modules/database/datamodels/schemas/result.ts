import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Document } from 'mongoose';
import {Draw, DrawSchema} from "@src/modules/database/datamodels/schemas/draw";
import {ApiProperty} from "@nestjs/swagger";

export type ResultDocument = Result & Document;
@Schema()
export class Result implements DataObject {
    @ApiProperty() @Prop({ require: true }) date: Date;
    @ApiProperty() @Prop({ require: true, type: DrawSchema }) draw?: Draw;

    // Data object members
    @ApiProperty() @Prop({ required: true, immutable: true }) creationUserId: string;
    @ApiProperty() @Prop() deletionDate?: Date;
    @ApiProperty() @Prop({ required: true }) modificationUserId: string;
}

export const ResultSchema = SchemaFactory.createForClass(Result).set('timestamps', true);
