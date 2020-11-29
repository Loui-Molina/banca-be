import {DataObject} from "./DataObject";
import {Roles} from "./Roles";
import {UserPreferences} from "./UserPreferences";
import {PhoneNumber} from "./PhoneNumber";
import {Movements} from "./Movements";

export class User implements DataObject {
    lastLogin?: Date;
    bankingId?: string;
    name?: string;
    username?: string;
    password?: string;
    email?: string;
    phone?: PhoneNumber;
    balance?: number;
    role?: Roles;
    preferences?: UserPreferences;
    movements?: Movements[];

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
}