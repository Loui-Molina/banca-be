import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { SignUpCredentialsDto } from '@auth/dtos/signUp.credentials.dto';

export class CreateConsortiumDto {
    @ApiProperty() user: SignUpCredentialsDto;
    @ApiProperty({ required: false }) _id: ObjectId;
    @ApiProperty({ required: false }) ownerUserId?: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() status: boolean;
}
