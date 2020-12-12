import { Draw } from './Draw';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataObject } from './DataObject';

export type ResultDocument = Result & Document;
@Schema()
export class Result  implements DataObject {
  @Prop({ require: true }) date?: Date;
  @Prop({ require: true, type: Draw }) draw?: Draw;

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
