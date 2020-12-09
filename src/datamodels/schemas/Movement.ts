import { DataObject } from './DataObject';

import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { LotteryTime } from './LotteryTime';

@Schema()
export class Movement implements DataObject {
  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}
export const MovementSchema = SchemaFactory.createForClass(Movement);
