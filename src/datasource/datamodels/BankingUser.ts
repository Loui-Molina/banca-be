import {UserPreferences} from "./UserPreferences";
import {Roles} from "./Roles";
import {User} from "./User";

class BankingUser implements User {
    bankingId: string;

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
    role: Roles.banker;
    username: string;
    id: string;
}