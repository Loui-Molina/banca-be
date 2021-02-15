import { PartialType } from '@nestjs/swagger';
import { LotteryTime } from '../datamodels/schemas/lottery.time';


export class LotteryTimeDto extends PartialType(LotteryTime) {}
