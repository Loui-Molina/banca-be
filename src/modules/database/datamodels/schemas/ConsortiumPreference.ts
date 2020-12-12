import { DataObject } from './DataObject';
import { PlayLimit } from './PlayLimit';
import { BlockedNumber } from './BlockedNumber';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ConsortiumPreferenceDocument = ConsortiumPreference & Document;
@Schema()
export class ConsortiumPreference implements DataObject {
  @Prop([PlayLimit]) limits?: PlayLimit[];
  @Prop([BlockedNumber]) blockedNumbers?: BlockedNumber[];

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const ConsortiumPreferenceSchema = SchemaFactory.createForClass(
  ConsortiumPreference,
);
