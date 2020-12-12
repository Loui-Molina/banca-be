import {DataObject} from './DataObject';
import {User} from './User';
import {Consortium} from './Consortium';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from "mongoose";

export type BankingDataDocument = BankingData & Document;

@Schema()
export class BankingData implements DataObject {
    // @Prop([Consortium]) consortium?: Consortium;
    // @Prop([User]) users?: User[];
    // @Prop({required: true, default: false}) isInitialized: boolean;

    // Data object members
    @Prop({required: true, immutable: true}) creationDate: Date;
    @Prop({required: true, immutable: true}) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({required: true}) modificationDate: Date;
    @Prop({required: true}) modificationUserId: string;

}

export const BankingDataSchema = SchemaFactory.createForClass(BankingData);
