import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, ObjectId } from 'mongoose';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema({timestamps:true})
export class RefreshToken{

    @Prop()
    userId: string;

    @ApiProperty()
    @Prop()
    ipAddress:string;
    
    @ApiProperty()
    @Prop()
    refreshTokenId:string;

}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken).set('collection', 'tokens');