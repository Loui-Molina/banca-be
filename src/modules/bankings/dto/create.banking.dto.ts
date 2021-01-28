import { ObjectId } from 'mongoose';
import { SignUpCredentialsDto } from '@auth/dtos/sign.up.credentials.dto';
import { BankingDto } from '@bankings/dto/banking.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBankingDto {
    @ApiProperty() user: SignUpCredentialsDto;
    @ApiProperty() banking: BankingDto;
    @ApiProperty() consortiumId?: ObjectId;
}
