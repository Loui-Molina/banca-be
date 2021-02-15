import { PartialType } from '@nestjs/swagger';
import { BettingLimit } from '../datamodels/schemas/betting.limit';

export class BettingLimitDto extends PartialType(BettingLimit) {}
