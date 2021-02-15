import { PartialType } from '@nestjs/swagger';
import { BettingLimit } from 'src/modules/database/datamodels/schemas/betting.limit';

export class BettingLimitUpdateLotteryDto extends PartialType(BettingLimit) {}
