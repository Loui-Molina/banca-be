import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ResponseDto {
    @ApiProperty({ type: String })
    @IsString()
    message: string;
    @ApiProperty({ type: [String] })
    @IsArray()
    @Type(() => String)
    error: string[];
    @ApiProperty({ type: String })
    @IsString()
    statusCode: number;
}
