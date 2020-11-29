import {DataObject} from "./DataObject";

export class UserPreferences implements DataObject {
    language?: string;

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
}