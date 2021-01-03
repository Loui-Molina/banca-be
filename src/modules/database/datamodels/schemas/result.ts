import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Document } from 'mongoose';
import { Draw, DrawSchema } from '@src/modules/database/datamodels/schemas/draw';

export type ResultDocument = Result & Document;
@Schema()
export class Result implements DataObject {
    @Prop({ require: true }) date?: Date;
    @Prop({ require: true, type: DrawSchema }) draw?: Draw;

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string;
}

export const ResultSchema = SchemaFactory.createForClass(Result).set('timestamps', true);
