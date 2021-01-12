import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {AuthCredentialsDto} from "@auth/dtos/auth.credentials.dto";

export class UpdateBankingDto {
    @ApiProperty({ required: true }) _id: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() status: boolean;
    @ApiProperty({ required: false }) ownerUserId: ObjectId;
    @ApiProperty() user: AuthCredentialsDto;
    @ApiProperty() showPercentage: boolean;
    @ApiProperty() selectedConsortium: ObjectId;
}
