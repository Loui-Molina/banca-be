import { IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterQueryDto {
    @IsString()
    @ApiProperty({ type: String, required: true })
    key: number;

    @IsOptional()
    @IsObject()
    @ApiProperty({ type: Object, required: false })
    value: any;
}
