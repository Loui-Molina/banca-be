import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { SignUpCredentialsDto } from '@auth/dtos/sign.up.credentials.dto';
import { IsBoolean, IsMongoId, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SignInCredentialsDto } from '@auth/dtos/sign.in.credentials.dto';
import { IsBoolean, IsMongoId, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateBankingDto {
    @ApiProperty({ required: true }) @IsMongoId() _id: ObjectId;
    @ApiProperty() @IsString() name: string;
    @ApiProperty() @IsBoolean() status: boolean;
    @ApiProperty({ required: false }) @IsMongoId() @IsOptional() ownerUserId?: ObjectId;
    @ApiProperty()
    @IsOptional()
    @IsObject() /* FIXME: @ValidateNested() @Type(() => SignInCredentialsDto)*/
    user?: SignUpCredentialsDto;
    @ApiProperty() @IsBoolean() showPercentage: boolean;
    @ApiProperty() @IsNumber() @IsOptional() cancellationTime?: number;
    @ApiProperty() @IsMongoId() selectedConsortium: ObjectId;
    @ApiProperty() @IsString() header: string;
    @ApiProperty() @IsString() footer: string;
}
