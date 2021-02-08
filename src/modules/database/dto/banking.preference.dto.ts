import { PartialType } from '@nestjs/swagger';
import { BankingPreference } from '@database/datamodels/schemas/banking.preference';

export class BankingPreferenceDto extends PartialType(BankingPreference) {}
