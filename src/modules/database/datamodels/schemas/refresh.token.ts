import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema({ timestamps: true, collection: 'tokens' })
export class RefreshToken extends Document {
    @Prop({ unique: true, type: mongoose.Schema.Types.ObjectId })
    userId: ObjectId;

    @ApiProperty()
    @Prop()
    ipAddress: string;

    @ApiProperty()
    @Prop()
    refreshTokenId: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
