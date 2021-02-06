import { ApiProperty } from '@nestjs/swagger';
import { PlayTypes } from '@database/datamodels/enums/play.types';
import { PlayNumbers } from '@database/datamodels/schemas/play.numbers';

export class LimitVerifyDto {
    @ApiProperty({ type: String, enum: PlayTypes }) playType?: PlayTypes;
    @ApiProperty({ type: PlayNumbers })
    playNumbers: PlayNumbers;
    @ApiProperty() lotteryId?: string;
}
