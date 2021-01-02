import { UserPreference } from '@src/modules/database/datamodels/schemas/user.preference';
import { Role } from '@database/datamodels/enums/role';
import {User} from "@src/modules/database/datamodels/schemas/u1ser";

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
