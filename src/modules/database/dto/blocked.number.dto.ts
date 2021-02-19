import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BlockedNumber } from '@database/datamodels/schemas/blocked.number';

export class BlockedNumberDto extends PartialType(BlockedNumber) {
    @ApiProperty() numbers?: number[];
    @ApiProperty() dates?: Date[];
}
