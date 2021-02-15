import { PartialType } from '@nestjs/swagger';
import { Transaction } from '../datamodels/schemas/transaction';


export class TransactionDto extends PartialType(Transaction) {}
