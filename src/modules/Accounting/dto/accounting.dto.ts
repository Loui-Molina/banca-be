import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class AccountingDto {
    @ApiProperty() @IsOptional() @IsString() bankingName?: string;
    @ApiProperty() @IsOptional() @IsString() consortiumName?: string;
    @ApiProperty() @IsOptional() @IsNumber() dueBalance?: number;
    @ApiProperty() @IsOptional() week?: any;
    @ApiProperty() @IsOptional() @IsBoolean() isPayed?: boolean;
}
