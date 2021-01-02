
import { PhoneNumber } from '@src/modules/database/datamodels/schemas/phone.number';
import { UserPreference } from '@src/modules/database/datamodels/schemas/user.preference';
import { Role } from '@database/datamodels/enums/role';
import {User} from "@database/datamodels/schemas/User";
import {Movement} from "@database/datamodels/schemas/Movement";
import {Bet} from "@database/datamodels/schemas/Bet";

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
