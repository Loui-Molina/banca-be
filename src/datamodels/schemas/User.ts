import { DataObject } from './DataObject';
import { Roles } from '../enums/Roles';
import { UserPreference } from './UserPreference';
import { SchemaFactory } from '@nestjs/mongoose';

export interface User extends DataObject {
  lastLogin?: Date;
  name?: string;
  username?: string;
  password?: string;
  role?: Roles;
  preferences?: UserPreference;

  // Data object members
  creationDate: Date;
  creationUserId: string;
  deletionDate: Date;
  modificationDate: Date;
  modificationUserId: string;
}
