import { PartialType } from '@nestjs/swagger';
import { UserPreference } from '../datamodels/schemas/user.preference';

export class UserPreferenceDto extends PartialType(UserPreference) {}
