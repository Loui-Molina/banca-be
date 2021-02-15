import { PartialType } from '@nestjs/swagger';
import { PlayLimit } from '../datamodels/schemas/play.limit';

export class PlayLimitDto extends PartialType(PlayLimit) {}
