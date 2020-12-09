// Los numeros que salieron en la loteria
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataObject } from './DataObject';

@Schema()
export class Draw implements DataObject {
  first?: number;
  second?: number;
  third?: number;
  fourth?: number;
  fifth?: number;
  sixth?: number;
  seventh?: number;

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}
export const DrawSchema = SchemaFactory.createForClass(Draw);
