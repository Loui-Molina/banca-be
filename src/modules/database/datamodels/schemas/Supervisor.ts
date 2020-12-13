import { DataObject } from './DataObject';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupervisorDocument = Supervisor & Document;
@Schema()
export class Supervisor implements DataObject {
  @Prop({ required: true }) userId: string;
  @Prop() idBanca: string[];

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const SupervisorSchema = SchemaFactory.createForClass(Supervisor);
