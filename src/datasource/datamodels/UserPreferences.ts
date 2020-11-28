import {dataObject} from "./DataObject";

export class UserPreferences implements dataObject {
    language?: string;

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
}