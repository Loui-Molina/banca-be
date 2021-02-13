import { PartialType } from '@nestjs/swagger';
import { ConsortiumPreference } from '@database/datamodels/schemas/consortium.preference';

export class ConsortiumPreferenceDto extends PartialType(ConsortiumPreference) {}
