import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class Draw extends Document implements DataObject {
    // Los numeros que salieron en la loteria
    @ApiProperty() @Prop() first?: number;
    @ApiProperty() @Prop() second?: number;
    @ApiProperty() @Prop() third?: number;
    @ApiProperty() @Prop() fourth?: number;
    @ApiProperty() @Prop() fifth?: number;
    @ApiProperty() @Prop() sixth?: number;
    @ApiProperty() @Prop() seventh?: number;

    /** Data object members*/
    @ApiProperty()
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    creationUserId: ObjectId;
    @ApiProperty() @Prop() deletionDate?: Date;
    @ApiProperty() @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;
}

export const DrawSchema = SchemaFactory.createForClass(Draw);
