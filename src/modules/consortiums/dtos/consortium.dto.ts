import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import {AuthCredentialsDto} from "@auth/dtos/auth.credentials.dto";

export class ConsortiumDto {
    @ApiProperty() creationUserId: ObjectId;
    @ApiProperty() modificationUserId: ObjectId;
    @ApiProperty() user: AuthCredentialsDto;
    @ApiProperty() ownerName: string;
    @ApiProperty() _id: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() createdAt: Date;
    @ApiProperty() status: boolean;
    @ApiProperty() firstTransactionDate: Date;

}
