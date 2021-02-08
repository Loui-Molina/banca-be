import { PartialType } from '@nestjs/swagger';
import { Bet } from '@database/datamodels/schemas/bet';

export class BetDto extends PartialType(Bet) {}
