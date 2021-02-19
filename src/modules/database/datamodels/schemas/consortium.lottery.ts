import { DataObject } from '@database/datamodels/schemas/data.object';
import { BettingLimit, BettingLimitSchema } from '@database/datamodels/schemas/betting.limit';
import { PrizeLimit, PrizeLimitSchema } from '@database/datamodels/schemas/prize.limit';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BlockedNumber, BlockedNumberSchema } from '@database/datamodels/schemas/blocked.number';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class ConsortiumLottery extends Document implements DataObject {
    @ApiProperty() _id?: ObjectId;
    @ApiProperty() @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId }) lotteryId?: ObjectId;
    @ApiProperty({ isArray: true })
    @Prop({ required: false, type: [mongoose.SchemaTypes.ObjectId] })
    bankingIds?: ObjectId[];
    @Prop({ type: [BlockedNumberSchema] }) blockedNumbers?: BlockedNumber[];

    // Cuanto y a que se le puede apostar
    @ApiProperty() @Prop({ type: [BettingLimitSchema] }) bettingLimits?: BettingLimit[];
    // Cuanto se paga a un ganador por cada peso apostado
    @ApiProperty() @Prop({ type: [PrizeLimitSchema] }) prizeLimits?: PrizeLimit[];

    /** Data object members*/
    @ApiProperty()
    @Prop({ required: true, immutable: true, type: mongoose.Schema.Types.ObjectId })
    creationUserId: ObjectId;
    @ApiProperty() @Prop() deletionDate?: Date;
    @ApiProperty() @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) modificationUserId: ObjectId;
}

export const ConsortiumLotterySchema = SchemaFactory.createForClass(ConsortiumLottery);
