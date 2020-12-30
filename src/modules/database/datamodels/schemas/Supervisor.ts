import { DataObject } from '@database/datamodels/schemas/DataObject';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupervisorDocument = Supervisor & Document;
@Schema()
export class Supervisor implements DataObject {
    @Prop({ required: true }) userId: string;
    @Prop() bankingIds: string[];

    // Data object members
    @Prop({ required: true, immutable: true }) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) modificationUserId: string;
}

export const SupervisorSchema = SchemaFactory.createForClass(Supervisor).set('timestamps', true);
