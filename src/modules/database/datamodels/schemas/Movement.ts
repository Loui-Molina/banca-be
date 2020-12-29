import { DataObject } from '@database/datamodels/schemas/DataObject';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovementDocument = Movement & Document;
@Schema()
export class Movement implements DataObject {
  // Data object members
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationUserId: string;
}
export const MovementSchema = SchemaFactory.createForClass(Movement).set('timestamps', true);
