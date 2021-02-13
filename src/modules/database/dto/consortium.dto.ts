import { PartialType } from '@nestjs/swagger';
import { Consortium } from '@database/datamodels/schemas/consortium';

export class ConsortiumDto extends PartialType(Consortium) {}
