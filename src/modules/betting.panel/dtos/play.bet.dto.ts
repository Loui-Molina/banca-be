import { PartialType } from '@nestjs/mapped-types';
import { Play } from 'src/modules/database/datamodels/schemas/play';

export class PlayBetDto extends PartialType(Play) {}
