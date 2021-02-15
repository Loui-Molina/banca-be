import { PartialType } from '@nestjs/swagger';
import { Consortium } from '../datamodels/schemas/consortium';

export class ConsortiumDto extends PartialType(Consortium) {}
