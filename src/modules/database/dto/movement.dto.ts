import { PartialType } from '@nestjs/swagger';
import { Movement } from '@database/datamodels/schemas/movement';

export class MovementDto extends PartialType(Movement) {}
