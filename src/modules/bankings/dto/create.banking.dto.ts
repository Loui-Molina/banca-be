import { ObjectId } from 'mongoose';
import { SignUpCredentialsDto } from '@auth/dtos/sign.up.credentials.dto';
import { BankingDto } from '@bankings/dto/banking.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBankingDto {
    @ApiProperty() @ValidateNested() @Type(() => SignUpCredentialsDto) user: SignUpCredentialsDto;
    @ApiProperty() @IsObject() banking: BankingDto;
    @ApiProperty() @IsObject() consortiumId?: ObjectId;
}
