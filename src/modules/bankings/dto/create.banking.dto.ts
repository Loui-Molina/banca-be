import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SignUpCredentialsDto } from '@src/modules/auth/dtos/sign.up.credentials.dto';
import { BankingDto } from './banking.dto';

export class CreateBankingDto {
    @ApiProperty() @ValidateNested() @Type(() => SignUpCredentialsDto) user: SignUpCredentialsDto;
    @ApiProperty() @IsObject() banking: BankingDto;
    @ApiProperty() @IsMongoId() consortiumId?: ObjectId;
}
