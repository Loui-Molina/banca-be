import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FilterQueryDto } from '@common/dto/filter-query.dto';

export class PaginationQueryDto {
    @IsOptional()
    @IsNumber()
    @ApiProperty({ type: Number, required: false })
    limit: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ type: Number, required: false })
    offset: number;

    @IsOptional()
    @IsArray()
    @ApiProperty({ type: FilterQueryDto, isArray: true })
    filters: FilterQueryDto[] = [];
}
