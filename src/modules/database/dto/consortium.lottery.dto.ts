import { PartialType } from '@nestjs/swagger';
import { ConsortiumLottery } from '@database/datamodels/schemas/consortium.lottery';

export class ConsortiumLotteryDto extends PartialType(ConsortiumLottery) {}
