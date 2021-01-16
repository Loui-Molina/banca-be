import { ObjectId } from 'mongoose';
import { SignUpCredentialsDto } from '@auth/dtos/signUp.credentials.dto';
import { BankingDto } from '@src/modules/banking/dto/banking.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBankingDto {
    @ApiProperty() user: SignUpCredentialsDto;
    @ApiProperty() banking: BankingDto;
    @ApiProperty() consortiumId?: ObjectId;
}
