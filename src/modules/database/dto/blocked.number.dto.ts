import { PartialType } from '@nestjs/swagger';
import { BlockedNumber } from '@database/datamodels/schemas/blocked.number';

export class BlockedNumberDto extends PartialType(BlockedNumber) {}
