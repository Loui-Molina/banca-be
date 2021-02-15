import { PartialType } from '@nestjs/swagger';
import { Lottery } from '../datamodels/schemas/lottery';


export class LotteryDto extends PartialType(Lottery) {}
