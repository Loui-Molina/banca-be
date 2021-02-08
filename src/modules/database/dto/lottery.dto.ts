import { PartialType } from '@nestjs/swagger';
import { Lottery } from '@database/datamodels/schemas/lottery';

export class LotteryDto extends PartialType(Lottery) {}
