import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, optimisticConcurrency: true, useNestedStrict: true, strict: true })
export class Supervisor extends mongoose.Document /*implements DataObject*/ {
    @Prop({ required: true }) userId: string;
    @Prop() bankingIds: string[];

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string;
}

export const SupervisorSchema = SchemaFactory.createForClass(Supervisor);
