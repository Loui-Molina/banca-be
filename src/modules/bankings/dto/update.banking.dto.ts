import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { SignUpCredentialsDto } from '@auth/dtos/sign.up.credentials.dto';

export class UpdateBankingDto {
    @ApiProperty({ required: true }) _id: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() status: boolean;
    @ApiProperty({ required: false }) ownerUserId: ObjectId;
    @ApiProperty() user: SignUpCredentialsDto;
    @ApiProperty() showPercentage: boolean;
    @ApiProperty() selectedConsortium: ObjectId;
}
