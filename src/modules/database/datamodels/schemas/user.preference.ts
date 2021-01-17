import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Languages } from '@database/datamodels/enums/languages';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class UserPreference extends Document implements DataObject {
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
    creationUserId: string | ObjectId;
    @ApiProperty()
    @Prop()
    deletionDate?: Date;
    @ApiProperty()
    @Prop({ required: true })
    modificationUserId: string | ObjectId;
}

export const UserPreferenceSchema = SchemaFactory.createForClass(UserPreference);
