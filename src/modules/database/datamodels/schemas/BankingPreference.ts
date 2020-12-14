import { DataObject } from './DataObject';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BankingPreferenceDocument = BankingPreference & Document;

@Schema()
export class BankingPreference implements DataObject {
  @Prop() logo?: string;
  @Prop() primaryColor?: string;
  @Prop() secondaryColor?: string;
  @Prop() tertiaryColor?: string;
  @Prop() bankingTitleColor?: string;
  @Prop() bankingTitleBGColor?: string;

  // Data object members
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop() deletionDate?: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const BankingPreferenceSchema = SchemaFactory.createForClass(
  BankingPreference,
);
