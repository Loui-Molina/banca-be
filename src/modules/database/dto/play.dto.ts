import { PartialType } from '@nestjs/swagger';
import { Play } from '@database/datamodels/schemas/play';

export class PlayDto extends PartialType(Play) {}
