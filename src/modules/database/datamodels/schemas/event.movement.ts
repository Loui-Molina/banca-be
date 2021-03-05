import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({timestamps:true})
export class EventMovement extends mongoose.Document {
    @Prop()
    type: string;

    @Prop()
    name: string;

    @Prop({ type: mongoose.SchemaTypes.Mixed })
    payload: Record<string, any>;
}

export const EventMovementSchema = SchemaFactory.createForClass(EventMovement);
