import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import {AuthCredentialsDto} from "@auth/dtos/auth.credentials.dto";

export class ConsortiumDto {
    @ApiProperty() ownerName: string;
    @ApiProperty() ownerId: ObjectId;
    @ApiProperty() _id: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() createdAt: Date;
    @ApiProperty() status: boolean;
    @ApiProperty() firstTransactionDate: Date;
}
