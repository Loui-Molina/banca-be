import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { SignUpCredentialsDto } from 'src/modules/auth/dtos/sign.up.credentials.dto';

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
