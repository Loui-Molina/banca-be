import { DataObject } from './DataObject';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class BankingPreference implements DataObject {
  @Prop() logo?: ImageBitmap; // TODO check data type
  @Prop() primaryColor?: string;
  @Prop() secondaryColor?: string;
  @Prop() tertiaryColor?: string;
  @Prop() bankingTitleColor?: string;
  @Prop() bankingTitleBGColor?: string;

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
