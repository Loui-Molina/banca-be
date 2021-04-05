import { PartialType } from '@nestjs/swagger';
import { LotteryTime } from '@database/datamodels/schemas/lottery.time';

export class LotteryTimeDto extends PartialType(LotteryTime) {}
