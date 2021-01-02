import { Movement } from '@database/datamodels/schemas/Movement';
import { PhoneNumber } from '@database/datamodels/schemas/PhoneNumber';
import { UserPreference } from '@database/datamodels/schemas/UserPreference';
import { User } from '@database/datamodels/schemas/User';
import { Bet } from '@database/datamodels/schemas/Bet';
import { Role } from '@database/datamodels/enums/role';

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
    role: Role.punter;
    username: string;
}
