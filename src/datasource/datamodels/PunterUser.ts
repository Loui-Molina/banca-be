import {Movements} from "./Movements";
import {PhoneNumber} from "./PhoneNumber";
import {UserPreferences} from "./UserPreferences";
import {Roles} from "./Roles";
import {User} from "./User";
import {Bet} from "./Bet";

class PunterUser implements User {
    movements?: Movements[];
    phone?: PhoneNumber;
    email?: string;
    balance?: number;
    bets?: Bet[];

    // User members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    lastLogin: Date;
    modificationDate: Date;
    modificationUserId: string;
    name: string;
    password: string;
    preferences: UserPreferences;
    role: Roles.punter;
    username: string;
    id: string;
}