// Main data object model
import {DataObject} from "./DataObject";
import {User} from "./User";
import {Consortium} from "./Consortium";

export class Data implements DataObject {
    lastChange?: Date;
    lastBackup?: Date;
    consortium?: Consortium;
    users?: Map<string, User>;

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
    id: string;
}