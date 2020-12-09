import { Movement } from './Movement';
import { PhoneNumber } from './PhoneNumber';
import { UserPreference } from './UserPreference';
import { Roles } from '../enums/Roles';
import { User } from './User';
import { Bet } from './Bet';

class PunterUser implements User {
  movements?: Movement[];
  phone?: PhoneNumber;
  email?: string;
  balance?: number;
  bets?: Bet[];

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
  role: Roles.punter;
  username: string;
}
