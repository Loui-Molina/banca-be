import { DataObject } from '@database/datamodels/schemas/data.object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class BankingAccounting extends Document implements DataObject {
    @Prop() week: Date;
    @Prop() dueBalance: number;
    @Prop() earningPercentage: number;
    @Prop() isPayed: boolean;

    /** Data object members*/
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId }) creationUserId: ObjectId;
    @Prop() deletionDate?: Date;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;
}

export const BankingAccountingSchema = SchemaFactory.createForClass(BankingAccounting);
