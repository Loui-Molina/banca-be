import { PartialType } from '@nestjs/swagger';
import { Transaction } from '@database/datamodels/schemas/transaction';

export class TransactionDto extends PartialType(Transaction) {}
