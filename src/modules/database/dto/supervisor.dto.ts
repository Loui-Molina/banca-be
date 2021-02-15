import { PartialType } from '@nestjs/swagger';
import { Supervisor } from '../datamodels/schemas/supervisor';


export class SupervisorDto extends PartialType(Supervisor) {}
