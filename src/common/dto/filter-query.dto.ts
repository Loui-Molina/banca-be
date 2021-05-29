import { IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { DominicanLotteryPrizes } from '@database/datamodels/enums/dominican.lottery.prizes';
import { UsLotteryPrizes } from '@database/datamodels/enums/us.lottery.prizes';
import { BrasilPrizes } from '@database/datamodels/enums/brasil.prizes';
import { FilterQueryTypeEnumDto } from '@common/dto/filter-query-type-enum.dto';

export class FilterQueryDto {
    @IsString()
    @ApiProperty({ type: String, required: true })
    key: number;

    @IsOptional()
    @IsObject()
    @ApiProperty({ type: Object, required: false })
    value: any;

    @Prop({
        type: String,
        enum: [FilterQueryTypeEnumDto],
    })
    @ApiProperty({ type: String, required: true })
    type?: FilterQueryTypeEnumDto;
}
