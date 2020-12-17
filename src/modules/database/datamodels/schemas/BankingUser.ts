import { UserPreference } from '@database/datamodels/schemas/UserPreference';
import { Roles } from '@database/datamodels/enums/Roles';
import { User } from '@database/datamodels/schemas/User';

export class BankingUser extends User {
  bankingId: string;

  // User members
  creationDate: Date;
  creationUserId: string;
  deletionDate?: Date;
  lastLogin: Date;
  modificationDate: Date;
  modificationUserId: string;
  name: string;
  password: string;
  preferences: UserPreference;
  role: Roles.banker;
  username: string;
}
