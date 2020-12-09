import { DataObject } from './DataObject';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class BankingPreference implements DataObject {
  logo?: ImageBitmap;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  bankingTitleColor?: string;
  bankingTitleBGColor?: string;

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}
export const BankingPreferenceSchema = SchemaFactory.createForClass(
  BankingPreference,
);
