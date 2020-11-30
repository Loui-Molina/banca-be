import {DataObject} from "./DataObject";

export class BlockedNumber implements DataObject {
    number?: number;
    position?: number;

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
    id: string;
}