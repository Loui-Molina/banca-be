import {UserPreferences} from "./UserPreferences";
import {Roles} from "./Roles";
import {User} from "./User";

class AdminUser implements User {
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
    role: Roles.admin;
    username: string;
    id: string;
}