import {UserPreferences} from "./UserPreferences";
import {Roles} from "./Roles";
import {User} from "./User";

class SupervisorUser implements User {
    bankingId: string[];

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
    role: Roles.supervisor;
    username: string;
    id: string;
}