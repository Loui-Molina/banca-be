import {DataObject} from "./DataObject";
import {PlayLimit} from "./PlayLimit";
import {BlockedNumber} from "./BlockedNumber";

export class ConsortiumPreferences implements DataObject {
    limits?: PlayLimit[];
    blockedNumbers?: BlockedNumber[];

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
    id: string;
}