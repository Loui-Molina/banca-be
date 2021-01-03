import {DataObject} from '@src/modules/database/datamodels/schemas/data.object';
import {BankingPreference, BankingPreferenceSchema} from '@src/modules/database/datamodels/schemas/banking.preference';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {Document, ObjectId} from 'mongoose';
import {Transaction, TransactionSchema} from "@src/modules/database/datamodels/schemas/transaction";
import {Bet, BetSchema} from "@src/modules/database/datamodels/schemas/bet";
import {Lottery, LotterySchema} from "@src/modules/database/datamodels/schemas/lottery";

export type BankingDocument = Banking & Document;

@Schema({ timestamps: true })
export class Banking implements DataObject {
    @Prop({ type: mongoose.Schema.Types.ObjectId }) ownerUserId: ObjectId;
    @Prop({ type: BankingPreferenceSchema })
    bankingPreferences?: BankingPreference;
    @Prop({ type: [TransactionSchema] }) transactions?: Transaction[];
    @Prop({ type: [LotterySchema] }) lotteries?: Lottery[];
    @Prop({ type: [BetSchema] }) bets?: Bet[];
    @Prop({ required: true }) name: string;
    @Prop({ required: true, default: 0 }) balance: number;

    // Que porcentaje se le paga a la banca por el total de sus ventas
    @Prop({ min: 0, max: 100 }) fallbackPercentage?: number;

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string;
}

export const BankingSchema = SchemaFactory.createForClass(Banking);
