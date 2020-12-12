import { DataObject } from './DataObject';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SupervisorDocument = Supervisor & Document;
@Schema()
export class Supervisor  implements DataObject {
  @Prop({ required: true }) userId: string;
  @Prop() idBanca: string[];

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const SupervisorSchema = SchemaFactory.createForClass(Supervisor);
