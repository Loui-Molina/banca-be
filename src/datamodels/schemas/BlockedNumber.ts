import { DataObject } from './DataObject';

import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class BlockedNumber implements DataObject {
  number?: number;
  position?: number;

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}
export const BlockedNumberSchema = SchemaFactory.createForClass(BlockedNumber);
