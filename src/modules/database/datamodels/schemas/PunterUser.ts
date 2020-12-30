import { Movement } from '@database/datamodels/schemas/Movement';
import { PhoneNumber } from '@database/datamodels/schemas/PhoneNumber';
import { UserPreference } from '@database/datamodels/schemas/UserPreference';
import { Roles } from '@database/datamodels/enums/Roles';
import { User } from '@database/datamodels/schemas/User';
import { Bet } from '@database/datamodels/schemas/Bet';

class PunterUser extends User {
    movements?: Movement[];
    phone?: PhoneNumber;
    email?: string;
    balance?: number;
    bets?: Bet[];

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
    role: Roles.punter;
    username: string;
}
