import { PartialType } from '@nestjs/swagger';
import { Draw } from '../datamodels/schemas/draw';


export class DrawDto extends PartialType(Draw) {}
