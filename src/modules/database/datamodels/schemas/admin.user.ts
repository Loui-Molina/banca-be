import { UserPreference } from '@src/modules/database/datamodels/schemas/user.preference';
import { Role } from '@database/datamodels/enums/role';
import { User } from '@src/modules/database/datamodels/schemas/user';
import { ObjectId } from 'mongoose';

class AdminUser extends User {
    // User members
    creationDate: Date;
    creationUserId: ObjectId;
    deletionDate?: Date;
    lastLogin: Date;
    modificationUserId: ObjectId;
    name: string;
    password: string;
    preferences: UserPreference;
    role: Role.admin;
    username: string;
}
