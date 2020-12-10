import { DataObject } from './DataObject';
import { DominicanLotteryPrizes } from '../enums/DominicanLotteryPrizes';
import { UsLotteryPrizes } from '../enums/UsLotteryPrizes';
import { BrasilPrizes } from '../enums/BrasilPrizes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Porcentaje que se le paga a cada banca por cada jugada que vende
@Schema()
export class BankingFeeLimit implements DataObject {
/*  @Prop({
    enum: [
      DominicanLotteryPrizes,
      UsLotteryPrizes,
      BrasilPrizes,
    ],
  })*/
  playType?: DominicanLotteryPrizes | UsLotteryPrizes | BrasilPrizes; // TODO check prop
  @Prop() feePercentage?: number;

  // Data object members
  @Prop({ required: true, immutable: true }) creationDate: Date;
  @Prop({ required: true, immutable: true }) creationUserId: string;
  @Prop({ required: true }) deletionDate: Date;
  @Prop({ required: true }) modificationDate: Date;
  @Prop({ required: true }) modificationUserId: string;
}

export const BankingFeeSchema = SchemaFactory.createForClass(BankingFeeLimit);
