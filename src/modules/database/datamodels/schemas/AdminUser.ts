import { UserPreference } from '@database/datamodels/schemas/UserPreference';
import { Roles } from '@database/datamodels/enums/Roles';
import { User } from '@database/datamodels/schemas/User';

class AdminUser extends User {
    // User members
    creationDate: Date;
    creationUserId: string;
    deletionDate?: Date;
    lastLogin: Date;
    modificationUserId: string;
    name: string;
    password: string;
    preferences: UserPreference;
    role: Roles.admin;
    username: string;
}
