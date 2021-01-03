import { ObjectId } from 'mongoose';
import { AuthCredentialsDto } from '@auth/dtos/auth.credentials.dto';
import { BankingDto } from '@src/modules/banking/dto/banking.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBankingDto {
    @ApiProperty() user: AuthCredentialsDto;
    @ApiProperty() banking: BankingDto;
    @ApiProperty() consortiumId?: ObjectId;
}
