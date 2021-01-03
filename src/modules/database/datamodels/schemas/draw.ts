// Los numeros que salieron en la loteria
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Document } from 'mongoose';

export type DrawDocument = Draw & Document;
@Schema()
export class Draw implements DataObject {
    @Prop() first?: number;
    @Prop() second?: number;
    @Prop() third?: number;
    @Prop() fourth?: number;
    @Prop() fifth?: number;
    @Prop() sixth?: number;
    @Prop() seventh?: number;

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string;
}

export const DrawSchema = SchemaFactory.createForClass(Draw).set('timestamps', true);