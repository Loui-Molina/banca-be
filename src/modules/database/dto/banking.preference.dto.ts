import { PartialType } from '@nestjs/swagger';
import { BankingPreference } from '../datamodels/schemas/banking.preference';

export class BankingPreferenceDto extends PartialType(BankingPreference) {}
