import { UserPreference } from './UserPreference';
import { Roles } from '../enums/Roles';
import { User } from './User';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class BankingUser implements User {
  bankingId: string;

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
  role: Roles.banker;
  username: string;
}
