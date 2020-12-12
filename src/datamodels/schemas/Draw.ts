// Los numeros que salieron en la loteria
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataObject } from './DataObject';

export type DrawDocument = Draw & Document;
@Schema()
export class Draw  implements DataObject {
  @Prop() first?: number;
  @Prop() second?: number;
  @Prop() third?: number;
  @Prop() fourth?: number;
  @Prop() fifth?: number;
  @Prop() sixth?: number;
  @Prop() seventh?: number;

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const DrawSchema = SchemaFactory.createForClass(Draw);
