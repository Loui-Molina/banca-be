import { PartialType } from '@nestjs/swagger';
import { Result } from '../datamodels/schemas/result';

export class ResultDto extends PartialType(Result) {}
