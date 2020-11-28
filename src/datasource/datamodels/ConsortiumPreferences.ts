import {dataObject} from "./DataObject";
import {bettingLimit} from "./BettingLimit";

export class consortiumPreferences implements dataObject {
    limits?: bettingLimit[];

    // Data object members
    creationDate?: Date;
    creationUserId?: string;
    modificationDate?: Date;
    modificationUserId?: string;
    deletionDate?: Date;
}