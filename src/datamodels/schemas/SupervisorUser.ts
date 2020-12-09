import { UserPreference } from './UserPreference';
import { Roles } from '../enums/Roles';
import { User } from './User';
import { SchemaFactory } from '@nestjs/mongoose';

class SupervisorUser implements User {
  bankingId: string[];

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
  role: Roles.supervisor;
  username: string;
}
