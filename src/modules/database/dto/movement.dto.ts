import { PartialType } from '@nestjs/swagger';
import { Movement } from '../datamodels/schemas/movement';

export class MovementDto extends PartialType(Movement) {}
