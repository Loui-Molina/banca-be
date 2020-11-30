import {DataObject} from "./DataObject";
import {Roles} from "./Roles";
import {UserPreferences} from "./UserPreferences";

export interface User extends DataObject {
    lastLogin?: Date;
    name?: string;
    username?: string;
    password?: string;
    role?: Roles;
    preferences?: UserPreferences;

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
}