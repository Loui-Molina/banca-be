import { Play } from '@database/datamodels/schemas/play';
import { PartialType } from '@nestjs/mapped-types';

export class PlayBetDto extends PartialType(Play) {}
