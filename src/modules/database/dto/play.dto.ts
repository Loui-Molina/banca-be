import { PartialType } from '@nestjs/swagger';
import { Play } from '../datamodels/schemas/play';

export class PlayDto extends PartialType(Play) {}
