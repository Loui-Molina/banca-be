import {dataObject} from "./DataObject";

export class blockedNumber implements dataObject {
    number?: number;
    position?: number;

    // Data object members
    creationDate?: Date;
    modificationDate?: Date;
    modificationUserId?: string;
}