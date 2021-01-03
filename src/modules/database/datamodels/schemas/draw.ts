import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Document } from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

export type DrawDocument = Draw & Document;
@Schema()
export class Draw implements DataObject {
    // Los numeros que salieron en la loteria
    @ApiProperty() @Prop() first?: number;
    @ApiProperty() @Prop() second?: number;
    @ApiProperty() @Prop() third?: number;
    @ApiProperty() @Prop() fourth?: number;
    @ApiProperty() @Prop() fifth?: number;
    @ApiProperty() @Prop() sixth?: number;
    @ApiProperty() @Prop() seventh?: number;

    // Data object members
    @ApiProperty() @Prop({ required: true, immutable: true }) creationUserId: string;
    @ApiProperty() @Prop() deletionDate?: Date;
    @ApiProperty() @Prop({ required: true }) modificationUserId: string;
}

export const DrawSchema = SchemaFactory.createForClass(Draw).set('timestamps', true);
