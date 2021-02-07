import { PartialType } from '@nestjs/swagger';
import { PrizeLimit } from '@database/datamodels/schemas/prize.limit';

export class PrizeLimitDto extends PartialType(PrizeLimit) {}
