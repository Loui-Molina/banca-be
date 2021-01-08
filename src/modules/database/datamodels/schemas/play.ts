import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { PlayTypes } from '@src/modules/database/datamodels/enums/play.types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PlayNumbers, PlayNumbersSchema } from '@src/modules/database/datamodels/schemas/play.numbers';

export type PlayDocument = Play & Document;

@Schema({ timestamps: true, optimisticConcurrency: true,useNestedStrict: true, strict: true })
export class Play implements DataObject {
    @Prop({ required: true, type: String }) playType?: PlayTypes;
    @Prop({ required: true }) amount?: number;
    @Prop({ required: true, type: PlayNumbersSchema }) playNumbers: PlayNumbers;

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string;
}

export const PlaySchema = SchemaFactory.createForClass(Play);
