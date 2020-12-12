import { DataObject } from './DataObject';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BlockedNumberDocument = BlockedNumber & Document;
@Schema()
export class BlockedNumber  implements DataObject {
  @Prop({ required: true }) number?: number;
  @Prop() position?: number;

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const BlockedNumberSchema = SchemaFactory.createForClass(BlockedNumber);
