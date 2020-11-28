// Main data object model
import {dataObject} from "./DataObject";
import {User} from "./User";
import {Consortium} from "./Consortium";

export class Data implements dataObject {
    lastChange?: Date;
    lastBackup?: Date;
    consortium?: Consortium;
    users?: Map<string, User>;
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
}