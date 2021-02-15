import { PartialType } from '@nestjs/swagger';
import { Banking } from '../datamodels/schemas/banking';


export class BankingDto extends PartialType(Banking) {}
