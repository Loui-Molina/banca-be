import { PartialType } from '@nestjs/swagger';
import { ConsortiumPreference } from '../datamodels/schemas/consortium.preference';


export class ConsortiumPreferenceDto extends PartialType(ConsortiumPreference) {}
