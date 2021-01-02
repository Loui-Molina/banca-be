import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {Languages} from "@src/modules/database/datamodels/enums/l1anguages";

export type UserPreferenceDocument = UserPreference & Document;

@Schema()
export class UserPreference implements DataObject {
    @ApiProperty()
    @Prop({
        type: String,
        enum: Languages,
        default: Languages.spanish,
    })
    language?: Languages;

    // Data object members
    @ApiProperty()
    @Prop({ required: true, immutable: true })
    creationUserId: string;
    @ApiProperty()
    @Prop()
    deletionDate?: Date;
    @ApiProperty()
    @Prop({ required: true })
    modificationUserId: string;
}

export const UserPreferenceSchema = SchemaFactory.createForClass(UserPreference).set('timestamps', true);
