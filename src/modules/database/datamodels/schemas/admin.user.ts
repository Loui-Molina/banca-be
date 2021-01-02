import { UserPreference } from '@src/modules/database/datamodels/schemas/user.preference';
import { User } from '@src/modules/database/datamodels/schemas/user';
import { Role } from '@database/datamodels/enums/role';

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
    role: Role.admin;
    username: string;
}