import { PartialType } from '@nestjs/swagger';
import { PlayNumbers } from '@database/datamodels/schemas/play.numbers';

export class PlayNumbersDto extends PartialType(PlayNumbers) {}
