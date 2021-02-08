import { PartialType } from '@nestjs/swagger';
import { Banking } from '@database/datamodels/schemas/banking';

export class BankingDto extends PartialType(Banking) {}
