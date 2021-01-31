import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class Message extends Document implements DataObject {
    @ApiProperty() _id?: ObjectId;
    @ApiProperty({ type: Date }) @Prop({ immutable: true }) date: Date;
    @ApiProperty({ type: String }) @Prop({ required: true }) message: string;
    @ApiProperty({ type: Boolean }) @Prop({ required: false }) readed: boolean;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    originId: ObjectId;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    destinationId: ObjectId;
    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    creationUserId: ObjectId;
    @ApiProperty({ type: Date }) @Prop() deletionDate?: Date;
    @ApiProperty({ type: String })
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    modificationUserId: ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
