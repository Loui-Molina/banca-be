import { DataObject } from '@src/modules/database/datamodels/schemas/data.object';
import { BankingPreference, BankingPreferenceSchema } from '@src/modules/database/datamodels/schemas/banking.preference';
import { Transaction, TransactionSchema } from '@src/modules/database/datamodels/schemas/transaction';
import { Lottery, LotterySchema } from '@src/modules/database/datamodels/schemas/lottery';
import { Bet, BetSchema } from '@src/modules/database/datamodels/schemas/bet';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BankingDocument = Banking & Document;

@Schema()
export class Banking implements DataObject {
    // @Prop({type: mongoose.Schema.Types.ObjectId, ref: UserSchema}) owner: User; // TODO CHECK
    @Prop({ type: BankingPreferenceSchema })
    bankingPreferences?: BankingPreference;
    @Prop({ type: [TransactionSchema] }) transactions?: Transaction[];
    @Prop({ type: [LotterySchema] }) lotteries?: Lottery[];
    @Prop({ type: [BetSchema] }) bets?: Bet[];
    @Prop({ required: true }) name: string;
    @Prop({ required: true, default: 0 }) balance: number;

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string;
}

export const BankingSchema = SchemaFactory.createForClass(Banking).set('timestamps', true);
