import { PartialType } from '@nestjs/swagger';
import { Draw } from '@database/datamodels/schemas/draw';

export class DrawDto extends PartialType(Draw) {}
