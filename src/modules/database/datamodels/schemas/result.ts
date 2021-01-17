import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Document, ObjectId } from 'mongoose';
import { Draw, DrawSchema } from '@src/modules/database/datamodels/schemas/draw';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class Result extends Document implements DataObject {
    @ApiProperty() @Prop({ require: true }) date: Date;
    @ApiProperty() @Prop({ require: true, type: DrawSchema }) draw?: Draw;

    // Data object members
    @ApiProperty() @Prop({ required: true, immutable: true }) creationUserId: string | ObjectId;
    @ApiProperty() @Prop() deletionDate?: Date;
    @ApiProperty() @Prop({ required: true }) modificationUserId: string | ObjectId;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
