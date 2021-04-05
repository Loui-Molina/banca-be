import { PartialType } from '@nestjs/swagger';
import { Supervisor } from '@database/datamodels/schemas/supervisor';

export class SupervisorDto extends PartialType(Supervisor) {}
