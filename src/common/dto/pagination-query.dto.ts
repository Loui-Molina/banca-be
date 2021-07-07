import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FilterQueryDto } from '@common/dto/filter-query.dto';

export class PaginationQueryDto {
    @ApiProperty({ type: Number, required: false })
    limit: number;

    @ApiProperty({ type: Number, required: false })
    offset: number;

    @ApiProperty({ type: FilterQueryDto, isArray: true })
    filters: FilterQueryDto[] = [];
}
