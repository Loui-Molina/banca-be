import { PartialType } from '@nestjs/swagger';
import { BlockedNumber } from '../datamodels/schemas/blocked.number';

export class BlockedNumberDto extends PartialType(BlockedNumber) {}
