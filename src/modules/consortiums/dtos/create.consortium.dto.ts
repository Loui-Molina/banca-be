import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { AuthCredentialsDto } from '@auth/dtos/auth.credentials.dto';

export class CreateConsortiumDto {
    @ApiProperty() user: AuthCredentialsDto;
    @ApiProperty({ required: false }) _id: ObjectId;
    @ApiProperty({ required: false }) ownerUserId?: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() status: boolean;
}
