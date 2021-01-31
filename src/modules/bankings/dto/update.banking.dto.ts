import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { SignUpCredentialsDto } from '@auth/dtos/sign.up.credentials.dto';
import { IsBoolean, IsMongoId, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SignInCredentialsDto } from '@auth/dtos/sign.in.credentials.dto';

export class UpdateBankingDto {
    @ApiProperty({ required: true }) @IsMongoId() _id: ObjectId;
    @ApiProperty() @IsString() name: string;
    @ApiProperty() @IsBoolean() status: boolean;
    @ApiProperty({ required: false }) @IsMongoId() ownerUserId: ObjectId;
    @ApiProperty() @ValidateNested() @Type(() => SignInCredentialsDto) user: SignUpCredentialsDto;
    @ApiProperty() @IsBoolean() showPercentage: boolean;
    @ApiProperty() @IsMongoId() selectedConsortium: ObjectId;
}
