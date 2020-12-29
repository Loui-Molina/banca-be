import { DataObject } from '@database/datamodels/schemas/DataObject';
import { PlayLimit, PlayLimitSchema } from '@database/datamodels/schemas/PlayLimit';
import { BlockedNumber, BlockedNumberSchema } from '@database/datamodels/schemas/BlockedNumber';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ConsortiumPreferenceDocument = ConsortiumPreference & Document;

@Schema()
export class ConsortiumPreference implements DataObject {
  @Prop({ type: [PlayLimitSchema] }) limits?: PlayLimit[];
  @Prop({ type: [BlockedNumberSchema] }) blockedNumbers?: BlockedNumber[];

  // Data object members
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const ConsortiumPreferenceSchema = SchemaFactory.createForClass(ConsortiumPreference).set('timestamps', true);
