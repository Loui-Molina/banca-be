import { UserPreference } from '@database/datamodels/schemas/UserPreference';
import { User } from '@database/datamodels/schemas/User';
import { Role } from '@database/datamodels/enums/role';

class ConsortiumUser extends User {
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
    role: Role.consortium;
    username: string;
}
