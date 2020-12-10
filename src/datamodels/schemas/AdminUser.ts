import { UserPreference } from './UserPreference';
import { Roles } from '../enums/Roles';
import { User } from './User';

class AdminUser extends User {
  // User members
  creationDate: Date;
  creationUserId: string;
  deletionDate: Date;
  lastLogin: Date;
  modificationDate: Date;
  modificationUserId: string;
  name: string;
  password: string;
  preferences: UserPreference;
  role: Roles.admin;
  username: string;
}
