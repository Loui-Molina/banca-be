import {dataObject} from "./DataObject";

export class blockedNumber implements dataObject {
    number?: number;
    position?: number;
    creationDate?: Date;
    modificationDate?: Date;
    modificationUserId?: string;
}