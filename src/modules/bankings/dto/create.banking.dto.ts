import { ObjectId } from 'mongoose';
import { SignUpCredentialsDto } from '@auth/dtos/sign.up.credentials.dto';
import { BankingDto } from '@bankings/dto/banking.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class CreateBankingDto {
    @ApiProperty() @IsObject() user: SignUpCredentialsDto;
    @ApiProperty() @IsObject() banking: BankingDto;
    @ApiProperty() @IsObject() consortiumId?: ObjectId;
}
