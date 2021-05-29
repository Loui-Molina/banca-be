import { PlayTypes } from '@database/datamodels/enums/play.types';
import { ObjectId } from 'mongoose';
import { PlayNumbersDto } from '@database/dto/play.numbers.dto';

export class LimitsDto {
    defaultLimits: DefaultLimit[];
    remainingLimits: RemainingLimit[];
}

export interface DefaultLimit {
    lotto: ObjectId;
    playType: PlayTypes;
    limit: number;
}

export interface RemainingLimit {
    lotto: ObjectId;
    play: PlayNumbersDto;
    limit: number;
}
