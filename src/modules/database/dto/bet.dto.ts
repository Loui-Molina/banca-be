import { PartialType } from '@nestjs/swagger';
import { Bet } from '../datamodels/schemas/bet';

export class BetDto extends PartialType(Bet) {}
