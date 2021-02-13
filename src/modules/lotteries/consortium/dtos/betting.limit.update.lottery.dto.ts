import { PartialType } from '@nestjs/swagger';
import { BettingLimit } from '@database/datamodels/schemas/betting.limit';

export class BettingLimitUpdateLotteryDto extends PartialType(BettingLimit) {}
