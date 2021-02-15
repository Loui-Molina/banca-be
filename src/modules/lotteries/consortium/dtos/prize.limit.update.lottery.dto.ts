import { PartialType } from '@nestjs/swagger';
import { PrizeLimit } from 'src/modules/database/datamodels/schemas/prize.limit';


export class PrizeLimitUpdateLotteryDto extends PartialType(PrizeLimit) {}
