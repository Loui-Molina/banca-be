// Main data object model
import {DataObject} from './DataObject';
import {User} from './User';
import {Consortium} from './Consortium';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from "mongoose";

export type AppDataDocument = AppData & Document;

@Schema()
export class AppData implements DataObject {
    @Prop([Consortium]) consortium?: Consortium;
    @Prop([User]) users?: User[];
    @Prop({required: true}) initialized: boolean;

    // Data object members
    @Prop({required: true, immutable: true}) creationDate: Date;
    @Prop({required: true, immutable: true}) creationUserId: string;
    @Prop({required: true}) deletionDate: Date;
    @Prop({required: true}) modificationDate: Date;
    @Prop({required: true}) modificationUserId: string;
}

export const AppDataSchema = SchemaFactory.createForClass(AppData);
