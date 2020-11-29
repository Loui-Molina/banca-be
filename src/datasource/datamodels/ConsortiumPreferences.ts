import {DataObject} from "./DataObject";
import {BettingLimit} from "./BettingLimit";
import {BlockedNumber} from "./BlockedNumber";

export class ConsortiumPreferences implements DataObject {
    limits?: BettingLimit[];
    blockedNumbers?: BlockedNumber[];

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
}