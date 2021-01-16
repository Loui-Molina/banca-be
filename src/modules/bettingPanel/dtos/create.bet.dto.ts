import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import {Play, PlaySchema} from "@database/datamodels/schemas/play";
import {Prop} from "@nestjs/mongoose";

export class CreateBetDto {
    @ApiProperty({ required: false }) _id: ObjectId;
    @ApiProperty({ type: [Play] }) @Prop({ immutable: true, type: [PlaySchema] }) plays: Play[];
}
