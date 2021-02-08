import { PartialType } from '@nestjs/swagger';
import { BettingLimit } from '@database/datamodels/schemas/betting.limit';

export class BettingLimitDto extends PartialType(BettingLimit) {}
