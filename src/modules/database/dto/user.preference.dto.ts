import { PartialType } from '@nestjs/swagger';
import { UserPreference } from '@database/datamodels/schemas/user.preference';

export class UserPreferenceDto extends PartialType(UserPreference) {}
